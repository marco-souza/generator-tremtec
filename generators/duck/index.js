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
        message: "Your duck name",
      },
      {
        type: "confirm",
        name: "ts",
        message: "Are you using typescript?",
      },
    ])
  }

  writing() {
    const ext = this.answers.ts ? "ts" : "js"
    const compName = pascalCase(this.answers.name)
    const componentsPath = `src/app/redux/${compName.toLowerCase()}`
    const templateConfig = { name: compName }

    // Create index
    this.fs.copyTpl(
      this.templatePath(`index.${ext}.ejs`),
      this.destinationPath(`${componentsPath}/index.${ext}`),
      templateConfig,
    )

    // Create reducer
    this.fs.copyTpl(
      this.templatePath(`reducer.${ext}.ejs`),
      this.destinationPath(`${componentsPath}/reducer.${ext}`),
      templateConfig,
    )

    // Create constants
    this.fs.copyTpl(
      this.templatePath(`constants.${ext}.ejs`),
      this.destinationPath(`${componentsPath}/constants.${ext}`),
      templateConfig,
    )

    // TODO: edit root file
  }
}
