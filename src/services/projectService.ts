import { Project } from "../data/projects";

const STORAGE_KEY = "younick_dynamic_projects";
const BACKUPS_KEY = "younick_auto_backups";

export interface BackupSnapshot {
  id: string;
  timestamp: string;
  projectCount: number;
  data: Project[];
}

export const projectService = {
  /**
   * Fetch all dynamically added projects from localStorage
   */
  getDynamicProjects(): Project[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to read projects from storage:", e);
    }
    return [];
  },

  /**
   * Save a new project or update an existing project
   */
  saveDynamicProject(project: Project): Project[] {
    const list = this.getDynamicProjects();
    const existingIndex = list.findIndex((p) => p.id === project.id);

    let updatedList: Project[];
    if (existingIndex >= 0) {
      // Update existing
      updatedList = [...list];
      updatedList[existingIndex] = project;
    } else {
      // Create new (prepend to show at top)
      updatedList = [project, ...list];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    this.triggerAutoBackup();
    return updatedList;
  },

  /**
   * Delete a dynamic project from storage
   */
  deleteDynamicProject(id: string): Project[] {
    const list = this.getDynamicProjects();
    const updatedList = list.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    this.triggerAutoBackup();
    return updatedList;
  },

  /**
   * Toggle the featured status of a project directly
   */
  toggleFeatured(id: string): Project[] {
    const list = this.getDynamicProjects();
    const updatedList = list.map((p) => {
      if (p.id === id) {
        return { ...p, featured: !p.featured };
      }
      return p;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    this.triggerAutoBackup();
    return updatedList;
  },

  /**
   * Export all dynamic projects as a JSON backup file
   */
  exportBackup(): void {
    const list = this.getDynamicProjects();
    const dataStr = JSON.stringify(list, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `younick_portfolio_backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  /**
   * Import dynamic projects from a uploaded JSON backup file
   */
  async importBackup(file: File): Promise<Project[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const resultStr = e.target?.result as string;
          const parsed = JSON.parse(resultStr);
          
          if (Array.isArray(parsed)) {
            // Simple validation that the items look like Project objects
            const validated = parsed.filter((p) => p && typeof p === "object" && typeof p.id === "string" && typeof p.title === "string");
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
            projectService.triggerAutoBackup();
            resolve(validated);
          } else {
            reject(new Error("Backup file must be a JSON array of projects."));
          }
        } catch {
          reject(new Error("Failed to parse JSON backup file."));
        }
      };
      
      reader.onerror = () => reject(new Error("Failed to read file."));
      reader.readAsText(file);
    });
  },

  /**
   * Wipes all dynamic projects (Clean slate)
   */
  purgeDatabase(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  /* ──────── AUTOMATED BACKUPS (WHATSAPP-LIKE RESTORE POINTS) ──────── */

  /**
   * Fetch all auto-backups from localStorage
   */
  getAutoBackups(): BackupSnapshot[] {
    try {
      const stored = localStorage.getItem(BACKUPS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to read auto-backups:", e);
    }
    return [];
  },

  /**
   * Trigger a new automatic snapshot of dynamic projects
   */
  triggerAutoBackup(): BackupSnapshot[] {
    try {
      const currentProjects = this.getDynamicProjects();
      const backups = this.getAutoBackups();
      
      // Don't save consecutive backups of identical data to prevent spamming space
      if (backups.length > 0) {
        const lastBackup = backups[0];
        if (JSON.stringify(lastBackup.data) === JSON.stringify(currentProjects)) {
          return backups; // No changes, return existing backups
        }
      }

      const newBackup: BackupSnapshot = {
        id: Math.random().toString(36).substring(2, 9) + Date.now(),
        timestamp: new Date().toISOString(),
        projectCount: currentProjects.length,
        data: currentProjects,
      };

      // Keep only last 10 entries to avoid exceeding storage quota limits
      const updatedBackups = [newBackup, ...backups].slice(0, 10);
      localStorage.setItem(BACKUPS_KEY, JSON.stringify(updatedBackups));
      return updatedBackups;
    } catch (e) {
      console.error("Failed to take automatic backup:", e);
      return this.getAutoBackups();
    }
  },

  /**
   * Restore the dynamic database from a specific snapshot id
   */
  restoreFromSnapshot(snapshotId: string): Project[] {
    const backups = this.getAutoBackups();
    const target = backups.find((b) => b.id === snapshotId);
    if (!target) {
      throw new Error("Backup snapshot not found.");
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(target.data));
    // Trigger a backup of this state so there's a restore point for the restore action itself
    this.triggerAutoBackup();
    return target.data;
  },

  /**
   * Delete a specific backup snapshot
   */
  deleteSnapshot(snapshotId: string): BackupSnapshot[] {
    const backups = this.getAutoBackups();
    const updated = backups.filter((b) => b.id !== snapshotId);
    localStorage.setItem(BACKUPS_KEY, JSON.stringify(updated));
    return updated;
  },

  /**
   * Download a specific snapshot as a JSON file
   */
  downloadSnapshot(snapshotId: string): void {
    const backups = this.getAutoBackups();
    const target = backups.find((b) => b.id === snapshotId);
    if (!target) return;
    
    const dataStr = JSON.stringify(target.data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `younick_portfolio_backup_${new Date(target.timestamp).toISOString().split("T")[0]}_${target.id}.json`;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
