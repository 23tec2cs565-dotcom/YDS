
import numpy as np
from tensorflow import keras
from tensorflow.keras import layers

X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([[0], [1], [1], [0]])

model = keras.Sequential([
    layers.Dense(4, activation='relu', input_shape=(2,)),
    layers.Dense(4, activation='relu'),
    layers.Dense(1, activation='sigmoid')
])

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

model.fit(X, y, epochs=100, verbose=1)

loss, accuracy = model.evaluate(X, y)
print("Accuracy:", accuracy)

predictions = model.predict(X)
print("Predictions:")
print(predictions)
