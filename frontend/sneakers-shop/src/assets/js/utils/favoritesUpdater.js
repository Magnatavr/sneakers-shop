// utils/favoritesUpdater.js
let updateCallback = null

export function setFavoritesUpdateCallback(callback) {
    updateCallback = callback
    console.log('Callback установлен:', typeof callback)
}

export async function updateFavorites() {
    console.log('Вызов updateFavorites, callback:', updateCallback)

    if (updateCallback && typeof updateCallback === 'function') {
        try {
            await updateCallback()
            console.log('Callback успешно выполнен')
        } catch (error) {
            console.error('Ошибка в callback:', error)
        }
    } else {
        console.warn('Callback не установлен или не является функцией')
    }
}

// Для отладки
export function getCallback() {
    return updateCallback
}