document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".exercise").forEach((exr) => {
    const editorContainer = document.createElement("div")
    editorContainer.className = "exercise-editor"
    editorContainer.style.display = "none" // Hide the Editor and Preview Panels until triggered

    // Hide the Solution until triggered
    const solution = exr.querySelector(".solution")
    solution.style.display = "none"

    // Create the Solve button
    const solveBtn = document.createElement("button")
    solveBtn.textContent = "Solve"
    solveBtn.type = "button"
    solveBtn.className = "btn btn-outline-secondary btn-sm exercise-solve-btn"
    solveBtn.style.marginBottom = "1em"
    solveBtn.style.marginRight = "0.5em"

    const solutionBtn = document.createElement("button")
    solutionBtn.textContent = "Show Solution"
    solutionBtn.type = "button"
    solutionBtn.className =
      "btn btn-outline-secondary btn-sm exercise-solve-btn"
    solutionBtn.style.marginBottom = "1em"
    // solutionBtn.disabled = true

    exr.appendChild(solveBtn)
    exr.appendChild(solutionBtn)

    // Editor column
    const editor = document.createElement("div")
    editor.className = "editor"
    const textarea = document.createElement("textarea")
    editor.appendChild(textarea)

    // Preview column
    const preview = document.createElement("div")
    preview.className = "preview"

    editorContainer.append(editor, preview)
    exr.appendChild(editorContainer)

    const codemirror = CodeMirror.fromTextArea(textarea, {
      mode: "markdown",
      lineWrapping: true,
      extraKeys: {
        Enter: "newlineAndIndentContinueMarkdownList",
        Tab: "indentMore",
        "Shift-Tab": "indentLess",
      },
      continueList: true,
    })

    // Real-time preview with MathJax
    function updatePreview() {
      preview.innerHTML = marked.marked(codemirror.getValue(), {
        breaks: true,
        highlight: null,
      })
      MathJax.typesetPromise([preview])
    }

    codemirror.on("change", updatePreview)
    updatePreview()

    // Create the Submit and Hide buttons (hidden initially)

    const container = document.createElement("div")
    container.className = "d-flex"

    const submitBtn = document.createElement("button")
    submitBtn.textContent = "Submit"
    submitBtn.type = "button"
    submitBtn.className = "btn btn-primary btn-sm ms-auto exercise-submit-btn"
    submitBtn.style.display = "none" // Hide initially until triggered

    container.appendChild(submitBtn)
    exr.appendChild(container)

    // When show solution button is clicked, toggle solution visibility
    solutionBtn.addEventListener("click", function () {
      solution.style.display =
        solution.style.display === "grid" ? "none" : "grid"
      solutionBtn.textContent =
        solutionBtn.textContent === "Show Solution"
          ? "Hide Solution"
          : "Show Solution"
    })

    // When solve button is clicked, toggle editor/preview and submit buttons
    solveBtn.addEventListener("click", function () {
      editorContainer.style.display =
        editorContainer.style.display === "grid" ? "none" : "grid"
      submitBtn.style.display =
        submitBtn.style.display === "inline-block" ? "none" : "inline-block"
      solveBtn.style.marginBottom =
        solveBtn.style.marginBottom === "0em" ? "1em" : "0em"
      solutionBtn.style.marginBottom =
        solutionBtn.style.marginBottom === "0em" ? "1em" : "0em"
      solveBtn.textContent = solveBtn.textContent === "Solve" ? "Hide" : "Solve"
    })
  })
})
