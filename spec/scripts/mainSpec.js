describe("search results", function(){

  function appendToDom(element, id, parent){
    parent = parent || document.body
    var element = document.createElement(element)
    element.class = id
    parent.appendChild(element)

    return element;
  }

  beforeEach(function(){
    searchContainer = appendToDom('div', 'search-container')
    searchTermField = appendToDom('input', 'search-input-term', searchContainer)
    searchResultsContainer = appendToDom('ul', 'search-results', searchContainer)
  })

  describe("before search query", function(){
    it("should have a field to input search terms", function(){
      expect(searchTermField).toBeDefined()
    })

    it("should have a container to display search results", function(){
      expect(searchResultsContainer).toBeDefined()
    })

    it("should not display any search results", function(){
      expect($(searchResultsContainer).children().length).toEqual(0)
    })
  })


// Currently defered to adding search bar
  describe("after successful search query", function(){
    it("should display search results", function(){
      expect($(searchResultsContainer).children().length).toBeGreaterThan(0)
    })
  })
})