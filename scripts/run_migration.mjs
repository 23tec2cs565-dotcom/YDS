import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const client = createClient({
  projectId: 'b0rnzdhr',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skL5rFuuZJByB0NvJI2wQKhnmBYkIKuYG1tC0FSWaoQpYbliCaOTm0GxhTicGktWhvvJKh075UZr9pnWmj0wpXGw6IA1Eiu2Ipnjxrd5tN1hGIdBGHKqhXfv0d37ccJixW7qBdnPoO19Nl1FwomD4EY4jaFX6pqoNXBGGI2lHu8OT0yNN0xM',
  useCdn: false,
});

async function uploadImage(localPath) {
  if (!localPath) return null;
  const cleanPath = localPath.split('?')[0];
  const fullPath = path.join(projectRoot, 'public', cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  try {
    const filename = path.basename(fullPath);
    const readStream = fs.createReadStream(fullPath);
    const asset = await client.assets.upload('image', readStream, { filename });
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (err) {
    console.error(`[Image Upload Failed] ${localPath}:`, err.message);
    return null;
  }
}

async function migrate() {
  console.log('--- Starting Sanity Migration for Younick Design Studio ---');

  // 1. Projects
  console.log('\n[1/4] Migrating Projects...');
  const projectsModule = await import('../src/data/projects.ts');
  const projects = projectsModule.projects || [];
  
  for (const p of projects) {
    console.log(`Uploading project: ${p.title} (${p.id})...`);
    const coverImage = await uploadImage(p.image);
    
    const galleryImages = [];
    if (Array.isArray(p.images)) {
      for (const imgPath of p.images) {
        const uploaded = await uploadImage(imgPath);
        if (uploaded) galleryImages.push(uploaded);
      }
    }

    const doc = {
      _id: `project-${p.id}`,
      _type: 'project',
      title: p.title,
      slug: { _type: 'slug', current: p.slug || p.id },
      category: p.category,
      location: p.location || 'Jaipur, Rajasthan',
      subtitle: p.subtitle || '',
      description: p.description || '',
      longDescription: p.longDescription || '',
      outcome: p.outcome || '',
      workScope: p.workScope || [],
      clientContact: p.clientContact || '',
      completionDate: p.completionDate || '',
      area: p.area || '',
      budget: p.budget || '',
      featured: Boolean(p.featured),
      videos: p.videos || [],
    };

    if (coverImage) doc.image = coverImage;
    if (galleryImages.length > 0) doc.images = galleryImages;

    await client.createOrReplace(doc);
    console.log(`✓ Project saved: ${p.title}`);
  }

  // 2. Services
  console.log('\n[2/4] Migrating Services...');
  const servicesModule = await import('../src/data/services.ts');
  const services = servicesModule.services || [];
  
  for (const s of services) {
    console.log(`Uploading service: ${s.title}...`);
    const coverImage = await uploadImage(s.image);

    const doc = {
      _id: `service-${s.id}`,
      _type: 'service',
      title: s.title,
      slug: { _type: 'slug', current: s.id },
      description: s.description || '',
      icon: s.icon || 'Home',
      features: s.features || [],
      timeline: s.timeline || '',
      video: s.video || '',
    };

    if (coverImage) doc.image = coverImage;

    await client.createOrReplace(doc);
    console.log(`✓ Service saved: ${s.title}`);
  }

  // 3. Team Members
  console.log('\n[3/4] Migrating Team Members...');
  const teamModule = await import('../src/data/team.ts');
  const teamMembers = teamModule.teamMembers || [];

  for (const m of teamMembers) {
    console.log(`Uploading team member: ${m.name}...`);
    const photo = await uploadImage(m.image);

    const doc = {
      _id: `teamMember-${m.id}`,
      _type: 'teamMember',
      name: m.name,
      slug: { _type: 'slug', current: m.id },
      role: m.role,
      description: m.description || '',
      expertise: m.expertise || [],
      isFounder: Boolean(m.isFounder),
      badge: m.badge || '',
    };

    if (photo) doc.image = photo;

    await client.createOrReplace(doc);
    console.log(`✓ Team member saved: ${m.name}`);
  }

  // 4. Testimonials
  console.log('\n[4/4] Migrating Testimonials...');
  const testModule = await import('../src/data/testimonials.ts');
  const testimonials = testModule.testimonials || [];

  for (const t of testimonials) {
    console.log(`Uploading review: ${t.name}...`);
    const doc = {
      _id: `testimonial-${t.id}`,
      _type: 'testimonial',
      name: t.name,
      role: t.role || 'Client',
      quote: t.quote,
      rating: t.rating || 5,
      location: t.location || 'Jaipur',
    };

    await client.createOrReplace(doc);
    console.log(`✓ Review saved: ${t.name}`);
  }

  console.log('\n========================================');
  console.log('🎉 ALL DATA SUCCESSFULLY MIGRATED TO SANITY!');
  console.log('========================================\n');
}

migrate().catch(console.error);
