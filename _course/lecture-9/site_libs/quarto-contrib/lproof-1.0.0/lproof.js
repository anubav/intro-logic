function getLine(n, lines) {
  // return the nth proof-line in a proof
  return [...lines].find((l) => l.dataset.number == n)
}

function crossrefs(line) {
  // return crossrefs for a proof-line
  const proof = line.parentNode
  const lines = proof.querySelectorAll(".proof-line")
  const refs = line.dataset.crossrefs.split(",").map((n) => Number(n))
  return refs.map((ref) => getLine(ref, lines))
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lproof").forEach((proof) => {
    const lines = proof.querySelectorAll(".proof-line")
    lines.forEach((line, index, lines) => {
      if (!line.dataset.ellipses) {
        // highlight lines and crossrefs on mouseenter
        line.addEventListener("mouseenter", function () {
          this.classList.add("hl-primary")
          if (this.dataset.crossrefs) {
            crossrefs(this).forEach((line) => {
              line.classList.add("hl-secondary")
            })
          }
        })
        // unhighlight lines and crossrefs on mouseleave
        line.addEventListener("mouseleave", function () {
          this.classList.remove("hl-primary")
          if (this.dataset.crossrefs) {
            crossrefs(this).forEach((line) => {
              line.classList.remove("hl-secondary")
            })
          }
        })
      }
    })
  })
})
