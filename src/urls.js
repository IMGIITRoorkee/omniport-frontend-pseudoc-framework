export function urlBaseApi () {
  return `/api/pseudoc_framework`
}

export function appsApi () {
  return `${urlBaseApi()}/apps/`
}

export function appDetailApi (id) {
  return `${appsApi()}${id}/`
}

export function queryDetailApi (id) {
  return `${urlBaseApi()}/query/${id}/`
}

export function executeQueryApi (id) {
  return `${urlBaseApi()}/execute_query/${id}/`
}
