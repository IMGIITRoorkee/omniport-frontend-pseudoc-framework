// Backend URLs

export function urlBaseApi() {
    return `/api/pseudoc_framework`;
}

// Get APIs

export function appsApi() {
    return `${urlBaseApi()}/apps/`
}

export function appDetailApi(id) {
    return `${appsApi()}${id}/`
}