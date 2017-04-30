function SterzdenSnappyNavi() {
    this.offsetToToggleSticky = 115; // number of Pixels from document top
    this.naviElem = null; // used to store the DOM element we toggle
    this.stickyClassName = 'ds-nav__is-fixed'; // CSS class used to make sticky
}

SterzdenSnappyNavi.prototype.init = function init() {
    // register element and its position as the point where we toggle the 
    // navi's sticky state, so it snaps or unsnaps
    this.naviElem = queryElement('.ds-nav');

    if (this.naviElem && this.naviElem.offsetTop && this.naviElem.offsetTop > 0) {
        this.offsetToToggleSticky = this.naviElem.offsetTop;
    }

    // register (passive) event listener:
    window.addEventListener('scroll', toggleSticky.bind(this), { passive: true });

    // call once to make sure even without any scrolling event
    // the initial layout will match what it should
    toggleSticky.call(this);

    function toggleSticky() {
        if (window.scrollY >= this.offsetToToggleSticky) {
            // make it snap and become sticky
            if (!this.naviElem.classList.contains(this.stickyClassName)) {
                this.naviElem.classList.add(this.stickyClassName);
            }

        } else {
            // make it unsnap and become normal element which scrolls in-place
            if (this.naviElem.classList.contains(this.stickyClassName)) {
                this.naviElem.classList.remove(this.stickyClassName);
            }

        }
    }
};

var snappyNavi = new SterzdenSnappyNavi();
snappyNavi.init();
