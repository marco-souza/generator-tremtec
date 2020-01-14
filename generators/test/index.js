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
        message: "Who need tests?",
      },
      {
        type: "confirm",
        name: "core",
        default: false,
        message: "Is it a core component?",
      },
      {
        type: "confirm",
        name: "ts",
        message: "Are you using typescript?",
      },
      {
        type: "confirm",
        name: "continue",
        message: "Do you need Jest and enzyme well configured, wanna continue?",
      },
    ])
  }

  writing() {
    if (!this.answers.continue) return

    const ext = this.answers.ts ? "ts" : "js"
    const core = this.answers.core ? "/core" : ""
    const compName = pascalCase(this.answers.name)
    const componentsPath = `src/app/components${core}/${compName}`
    const templateConfig = {
      name: compName,
    }

    // Create test
    this.fs.copyTpl(
      this.templatePath(`sample.ejs`),
      this.destinationPath(`${componentsPath}/${compName}.test.${ext}`),
      templateConfig,
    )
  }
}
