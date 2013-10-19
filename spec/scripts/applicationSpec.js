// test suite depends on mockQueryResponse

describe("display search results", function(){
  beforeEach(function(){
    var container = document.createElement('div')
    container.className = 'container'
    document.body.appendChild(container)

    $('<table>', {class: 'results-table'}).appendTo(container)
    $('<table>', {class: 'queue-table'}).appendTo(container)
  })

  it("should display correct number of results", function(){
    var numResults = mockQueryResponse.result.results.length

    ViewController.displaySearchResults(mockQueryResponse)
    expect($('.results-table').find('tr')).toHaveLength(numResults)
  })
})