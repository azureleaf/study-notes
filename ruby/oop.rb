class Book
  # access methods
  attr_reader :author # getter
  attr_writer :lang # setter
  attr_accessor :title # getter + setter

  # constructor
  def initialize(title, author, lang)
    @title  = title
    @author = author
    @lang = lang
  end
end

book1 = Book.new('Lord of the Rings', 'Tolkien', 'English')
book1.title = 'Hobbit'
book1.lang = 'EN'
puts book1.author # You can't show book1.lang here, because it doesn't have a getter
p book1

class ElectronicBook < Book
  attr_reader :data_size

  def initialize(title, author, lang, data_size)
    super(title, author, lang)
    @data_size = data_size
  end
end

ebook1 = ElectronicBook.new('HHGTTG', 'Douglas Adams', 'English', 100)
p ebook1
puts ebook1.author # .lang still fails; accessor is also inherited.
