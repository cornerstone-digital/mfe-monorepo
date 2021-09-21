const getWorker = () => {
  const messenger = `
  self.addEventListener('message', function (event) {
    self.postMessage(event.data)
  });
  `

  if (typeof Blob !== 'undefined') {
    const blob = new Blob([messenger])
    return URL.createObjectURL(blob)
  }
  return ''
}

export default getWorker
