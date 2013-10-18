describe("adding song to queue", function(){

  function appendToDom(element, id, parent){
    parent = parent || document.body
    var element = document.createElement(element)
    element.className = id
    parent.appendChild(element)

    return element;
  }

  beforeEach(function(){
    mainContainer = appendToDom('div', 'container')

    searchContainer = appendToDom('div', 'search-container', mainContainer)
    searchTermField = appendToDom('input', 'search-input-term', searchContainer)
    searchSubmitButton = appendToDom('button', 'search-submit', searchContainer)

    resultsContainer = appendToDom('div', 'results-container', mainContainer)
    resultsList = appendToDom('ul', 'results-list', resultsContainer)
  })

  afterEach(function(){
    document.body.removeChild(mainContainer)
  })

  describe("before search query", function(){
    it("should have a field to input search terms", function(){
      expect(searchTermField).toBeDefined()
    })

    it("should have a submit button", function(){
      expect(searchSubmitButton).toBeDefined()
    })

    it("should have a container to display search results", function(){
      expect(resultsList).toBeDefined()
    })

    it("should not display any search results", function(){
      expect($(resultsList).children().length).toEqual(0)
    })
  })

  describe("at search query action", function(){
    it("search button click event should fetch search results", function(){
      spy = spyOn(Controller, "fetchSearchResults")
      $(searchSubmitButton).trigger('click')
      expect(spy).toHaveBeenCalled()
    })
  })

// Currently defered to adding search bar
  describe("after successful search query", function(){
    beforeEach(function(){
      Controller.displaySearchResults(query_response)
      first_result = $(resultsList).children().first()
    })

    it("should display search results", function(){
      expect($(resultsList).children().length).toEqual(25)
    })
    it("should display correct text", function(){
      expect(first_result.text()).toContain("Who Let The Dogs Out")
    })
    it("each result should have an add button", function(){
      expect(first_result.html()).toContain ('button' && 'add-result')
    })
  })
})