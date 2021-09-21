import qs from 'qs'

export function getQueryMap() {
  return qs.parse(window.location.search || '', { ignoreQueryPrefix: true })
}
