describe("search results", function(){

  function appendToDom(element, id, parent){
    parent = parent || document.body
    var element = document.createElement(element)
    element.class = id
    parent.appendChild(element)

    return element;
  }

  beforeEach(function(){
    searchResultsContainer = appendToDom('ul', 'search-results')
  })

  describe("before search query", function(){
    it("should have a container to display search results", function(){
      expect(searchResultsContainer).toBeDefined()
    })

    it("should not display any search results", function(){
      expect($(searchResultsContainer).children().length).toEqual(0)
    })
  })

  describe("after successful search query", function(){
    it("should display search results", function(){
      expect($(searchResultsContainer).children().length).toBeGreaterThan(0)
    })
  })
})