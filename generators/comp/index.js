const Generator = require("yeoman-generator")
const { pascalCase } = require("change-case")

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your component name",
      },
      {
        type: "confirm",
        name: "core",
        message: "Is it a core component?",
        default: false,
      },
      {
        type: "confirm",
        name: "ts",
        message: "Are you using typescript?",
      },
      {
        type: "confirm",
        name: "styled",
        message: "Do you already have styled-components installed?",
      },
    ])
  }

  writing() {
    const ext = this.answers.ts ? "ts" : "js"
    const corePath = this.answers.core ? "/core" : ""
    const compName = pascalCase(this.answers.name)
    const componentsPath = `src/app/components${corePath}/${compName}`
    const templateConfig = {
      name: compName,
    }

    // Create index
    this.fs.copyTpl(
      this.templatePath(`index.${ext}.tmpl`),
      this.destinationPath(`${componentsPath}/index.${ext}`),
      templateConfig,
    )

    // Create styled
    this.fs.copyTpl(
      this.templatePath("styled.tmpl"),
      this.destinationPath(`${componentsPath}/styled.${ext}`),
      templateConfig,
    )
  }
}
