module PasswordHelper
  def generatePassword
    page = Nokogiri::HTML(open("http://hipsteripsum.me/?paras=1&type=hipster-centric"))
    page_string = page.css("div[id='content']").css("p")[0].content
    words_string = page_string.sub(/[<].{1,2}[>]/,"").gsub(/[^a-zA-Z ]/, "")
    words_array = words_string.split(" ").delete_if{ |word| word.length < 5 }.map{|word| word.capitalize }
    return "#{words_array.sample} #{words_array.sample}"
  end
end