interface Button {
  render: () => void
  onclick: (cb: Function) => void
}

class WindowsButton implements Button {
  render() {}
  onclick(cb: Function) {
    cb()
  }
}

class WebButton implements Button {
  render() {}
  onclick(cb: Function) {
    cb()
  }
}

abstract class Dialog {
  abstract createButton(): Button

  close() {}

  render() {
    const button = this.createButton()
    button.onclick(this.close)
    button.render()
  }
}

class WindowsDialog extends Dialog {
  createButton() {
    return new WindowsButton()
  }
}

class WebDialog extends Dialog {
  createButton() {
    return new WebButton()
  }
}

type OS = 'Windows' | 'Web'

class Application {
  private dialog: Dialog | undefined

  constructor(os: OS) {
    this.init(os)
    this.dialog!.render()
  }

  init(os: OS) {
    if (os === 'Web') {
      this.dialog = new WindowsDialog()
    } else if (os === 'Windows') {
      this.dialog = new WebDialog()
    } else {
      throw new Error("未知操作系统")
    }
  }
}

const os = 'Windows'

new Application(os)