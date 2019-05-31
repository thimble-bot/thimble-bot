function scroll() {
  const hash = window.location.href.split('#').pop();

  if (!hash) {
    return;
  }

  const element = document.getElementById(hash);

  if (!element) {
    return;
  }

  const offset = element.offsetTop;
  window.scrollTo(0, offset);
}

export default scroll;
