const Generator = require("yeoman-generator")
const { pascalCase } = require("change-case")

const ComponentGenerator = require("./comp")

const generators = {
  component: "tremtec:comp",
}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "list",
        name: "generator",
        message: "What do you wanna create?",
        choices: Object.keys(generators),
      },
    ]).then(answers => {
      const selectedGenerator = generators[answers.generator]
      this.composeWith(selectedGenerator)
    })
  }
}
