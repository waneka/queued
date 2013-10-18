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
  resultsTable = appendToDom('table', 'results-table', resultsContainer)

  queueContainer = appendToDom('div', 'queue-container', mainContainer)
  queueTable = appendToDom('table', 'queue-table', queueContainer)
})

afterEach(function(){
  document.body.removeChild(mainContainer)
})

describe("searching for a song", function(){

  describe("before search query", function(){
    it("should have a field to input search terms", function(){
      expect($('.search-input-term')).toExist()
    })

    it("should have a submit button", function(){
      expect($('.search-submit')).toExist()
    })

    it("should have a container to display search results", function(){
      expect($('.results-table')).toExist()
    })

    it("should not display any search results", function(){
      expect($('.results-table')).toBeEmpty()
    })
  })

  describe("at search query action", function(){
    it("search button click event should fetch search results", function(){
      var spy = spyOn(Controller, "fetchSearchResults")
      $(searchSubmitButton).trigger('click')
      expect(spy).toHaveBeenCalled()
    })
  })

// Currently defered to adding search bar
  describe("after successful search query", function(){
    beforeEach(function(){
      Controller.displaySearchResults(query_response)
      search_results_table_rows = $(resultsTable).find('tr')
      search_results_first_row = search_results_table_rows.first()
    })

    it("should display search results", function(){
      expect($(resultsTable).find('tr')).toHaveLength(25)
    })
    it("each result should have song title", function(){
      expect($(resultsTable).find('tr').first().text()).toContain("Who Let The Dogs Out")
    })
    it("each result should have an add button", function(){
      expect($(resultsTable).find('tr').first()).toContain($('button'))
    })
  })
})

describe("queue", function(){
  it("should have a table to contain table row", function(){
    expect($('.queue-table')).toExist()
  })
})

describe("adding a song from search query to queue", function(){
  it("add button event should append class of result row", function(){
  })
})