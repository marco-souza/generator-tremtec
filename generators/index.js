const Generator = require("yeoman-generator")
const { pascalCase } = require("change-case")

const generators = ["component", "test", "duck"]

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
        choices: generators,
      },
    ]).then(answers => {
      const selectedGenerator = `tremtec:${answers.generator}`
      this.composeWith(selectedGenerator)
    })
  }
}
