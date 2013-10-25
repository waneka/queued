var User = {
  init: function(){
    if($.cookie('key')){
      this.key = $.cookie('key')
    }
    else{
      this.key = this.makeKey()
      $.cookie('key', this.key)
    }
    this.ready = true
  },
  makeKey: function(){
    return Math.random().toString(36).substring(7)
  }
}
