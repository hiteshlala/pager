
class Pager {
  constructor(numPages, pagesDisplayWindow, pageButtonClickCB, elementOrID, styles) {
    this.pages = numPages;
    this.pagesDisplayWindow = pagesDisplayWindow;
    this.pager = (typeof elementOrID === 'string') ? document.getElementById(elementOrID) : elementOrID;
    this.buttons = [];
    this.injectedStyles = styles;
    this.currentPage = 0;
    this.pageButtonDisplayStartsAt = 0;
    this.updatePage = pageButtonClickCB;

    // bind class methods
    this.createRandomKey = this.createRandomKey.bind(this);
    this.createRandomKey = this.createRandomKey.bind(this);
    this.init = this.init.bind(this);
    this.pageButtonClickHandler = this.pageButtonClickHandler.bind(this);
    this.setButtonHoverStyle = this.setButtonHoverStyle.bind(this);
    this.shiftPagerWindow = this.shiftPagerWindow.bind(this);
    this.setPagerButtons = this.setPagerButtons.bind(this);
    this.leftClickhandler = this.leftClickhandler.bind(this);
    this.rightClickhandler = this.rightClickhandler.bind(this);
    this.setPage = this.setPage.bind(this);
    this.setStyle = this.setStyle.bind(this);
    this.createRandomKey = this.createRandomKey.bind(this);

    this.randomuuid = this.createRandomKey();
    this.init();
  }

  init() {
    this.setStyle();
    this.pager.classList.add(`pager-${this.randomuuid}`);
    this.left = document.createElement('div');
    this.right = document.createElement('div');
    this.buttons = [];
    for(let i = 0; i < this.pagesDisplayWindow; i++) {
      const butelement = document.createElement('div');
      butelement.onpointerdown = this.pageButtonClickHandler;
      butelement.classList.add(`pager-button-${this.randomuuid}`);
      this.buttons.push( butelement );
    }

    this.left.innerText = '<';
    this.left.onpointerdown = this.leftClickhandler;
    this.left.classList.add(`pager-button-${this.randomuuid}`);

    this.right.innerText = '>';
    this.right.onpointerdown = this.rightClickhandler;
    this.right.classList.add(`pager-button-${this.randomuuid}`);

    this.pager.appendChild(this.left);
    this.buttons.forEach((function(element) { this.pager.appendChild(element); }).bind(this));
    this.pager.appendChild(this.right);

    this.setPagerButtons();
    this.setButtonHoverStyle();
    this.updatePage(this.page);
  }

  pageButtonClickHandler(event) {
    const newPageNum = typeof event === 'number' ? event : parseInt(event.target.dataset.page);
    if ( this.currentPage !== newPageNum) {
      this.currentPage = newPageNum;
      this.setButtonHoverStyle();
      this.updatePage(this.page);
    }
  }

  setButtonHoverStyle() {
    this.shiftPagerWindow();
    for(const button of this.buttons ) {
      if( parseInt(button.dataset.page) === this.currentPage ) {
        button.classList.remove(`clickable-${this.randomuuid}`);
        button.classList.add(`selected-${this.randomuuid}`);
      } else {
        button.classList.add(`clickable-${this.randomuuid}`);
        button.classList.remove(`selected-${this.randomuuid}`);
      }
    }
    
    (this.currentPage === 0)
      ? this.left.classList.remove(`clickable-${this.randomuuid}`)
      : this.left.classList.add(`clickable-${this.randomuuid}`);

    ((this.pageButtonDisplayStartsAt + this.pagesDisplayWindow) >= this.pages)
      ? this.right.classList.remove(`clickable-${this.randomuuid}`)
      : this.right.classList.add(`clickable-${this.randomuuid}`);
  }

  shiftPagerWindow() {
    do {
      if ( this.currentPage >= (this.pageButtonDisplayStartsAt + this.pagesDisplayWindow)) {
        this.pageButtonDisplayStartsAt += this.pagesDisplayWindow;
      }
      else if (this.currentPage < this.pageButtonDisplayStartsAt) {
        this.pageButtonDisplayStartsAt -= this.pagesDisplayWindow;
      }
    } while( ( this.currentPage >= (this.pageButtonDisplayStartsAt + this.pagesDisplayWindow)) || (this.currentPage < this.pageButtonDisplayStartsAt));
    this.setPagerButtons();
  }

  setPagerButtons() {
    for( let i = 0; i < this.pagesDisplayWindow; i++) {
      const indexPage = this.pageButtonDisplayStartsAt + i;
      if ( indexPage < this.pages ) {
        this.buttons[i].innerText = indexPage + 1;
        this.buttons[i].dataset.page = indexPage;
        this.buttons[i].classList.remove(`hide-${this.randomuuid}`);
      }
      else {
        this.buttons[i].classList.add(`hide-${this.randomuuid}`);
      }
    }
  }

  leftClickhandler(event) {
    event.preventDefault();
    event.stopPropagation();
    if( this.currentPage > 0) {
      this.currentPage--;
      this.setButtonHoverStyle();
      this.updatePage(this.page);
    }
  }

  rightClickhandler(event) {
    event.preventDefault();
    event.stopPropagation();
    if ( this.currentPage < this.pages -1  ) {
      this.currentPage++;
      this.setButtonHoverStyle();
      this.updatePage(this.page);
    }
  }

  setPage(pageNumber) {
    const newPage = pageNumber - 1;
    if (newPage >= 0 && newPage < this.pages) {
      this.pageButtonClickHandler(newPage);
    }
  }

  get page() {
    return this.currentPage + 1;
  }

  setStyle() {
    const style = document.createElement('style');
    style.rel = "stylesheet";
    style.innerText = `
    .hide-${this.randomuuid} {
      visibility: hidden;
    }
    
    .pager-${this.randomuuid} {
      display: flex;
      flex-direction: row;
      max-width: 450px;
    }
    
    .pager-button-${this.randomuuid} {
      width: 32px;
      height: 32px;
      margin: 0 3px;
      text-align: center;
      flex-grow: 0;
      flex-shrink: 0;
      line-height: 30px;
      font-size: 12px;
    }
    
    .clickable-${this.randomuuid} {
      cursor: pointer;
    }
    .clickable-${this.randomuuid}:hover {
      border: 1px solid black;
    }

    .selected-${this.randomuuid} {
      background-color: deepskyblue;
      color: white
    }`;
    document.getElementsByTagName('head')[0].appendChild(style);

    if ( this.injectedStyles ) {
      let resultStyles = '';
      if (this.injectedStyles.pager ) {
        resultStyles += `.pager-${this.randomuuid} ${this.injectedStyles.pager} `;
      }
      if (this.injectedStyles['pager-button'] ) {
        resultStyles += `.pager-button-${this.randomuuid} ${this.injectedStyles['pager-button']} `;
      }
      if (this.injectedStyles.clickable ) {
        resultStyles += `.clickable-${this.randomuuid} ${this.injectedStyles.clickable} `;
      }
      if (this.injectedStyles['clickable:hover'] ) {
        resultStyles += `.clickable-${this.randomuuid}:hover ${this.injectedStyles['clickable:hover']} `;
      }
      if (this.injectedStyles.selected ) {
        resultStyles += `.selected-${this.randomuuid} ${this.injectedStyles.selected} `;
      }

      const injectedStyle = document.createElement('style');
      injectedStyle.rel = 'stylesheet';
      injectedStyle.innerText = resultStyles;
      document.getElementsByTagName('head')[0].appendChild(injectedStyle);
    }
  }

  createRandomKey(key) {
    key = key || 'xxxxxxxxxx';
    return key.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0;
      let v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
