// test suite depends on mockQueryResponse

describe("display search results", function(){
  beforeEach(function(){
    var container = document.createElement('div')
    container.className = 'container'
    document.body.appendChild(container)

    $('<table>', {class: 'queue-table'}).appendTo(container)
    $('<table>', {class: 'results-table'}).appendTo(container)
    ViewController.displaySearchResults(mockQueryResponse)
  })

  it("should display correct number of results", function(){
    var numResults = mockQueryResponse.result.results.length

    expect($('.results-table').find('tr')).toHaveLength(numResults)
  })

  it("should add search result to queue", function(){
    $('.result-row').first().find('button').trigger('click')
    expect($('.queue-table').html()).toContain($('.result-row').first().html())
  })
})

