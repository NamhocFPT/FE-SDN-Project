
//const API_DOMAIN = 'http://localhost:9999/api/'

const API_DOMAIN = 'http://localhost:9999/'

// ✅ GET
export const get = async (path) => {
    const response = await fetch(API_DOMAIN + path)
    const result = await response.json()
    return result
}


// ✅ POST

export const post = async (path, option) => {
    const response = await fetch(API_DOMAIN + path, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(option)
    })
    const result = await response.json()
    return result
}


// ✅ PATCH
export const patch = async (path, option, id) => {
    const response = await fetch(API_DOMAIN + path + '/' + id, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(option)
    })
    const result = await response.json()
    return result
}


// ✅ PUT (thêm mới — hỗ trợ cập nhật dạng full update)
export const put = async (path, option) => {
    const response = await fetch(API_DOMAIN + path, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(option)
    })
    const result = await response.json()
    return result
}

// ✅ DELETE
export const dele = async (path, id) => {
    const response = await fetch(API_DOMAIN + path + '/' + id, {
        method: 'DELETE'
    })
    const result = await response.json()
    return result
}
