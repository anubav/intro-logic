document.addEventListener("DOMContentLoaded", function () {
  const defs = document.getElementsByClassName("definition")
  for (const d of defs) {
    const id = d.id
    let re = new RegExp(d.dataset.re, d.dataset.flags)
    const paras = document.querySelectorAll(`#${id} ~ p`)
    // Replace every matching text with a link to the definition
    paras.forEach((p) => {
      p.innerHTML = p.innerHTML.replace(re, (match) => {
        return `<a href="#${id}" class="quarto-xref def-link" aria-expanded="false">${match}</a>`
      })
    })
  }
})
