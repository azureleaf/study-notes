#     This is the multi-line comment.
#     This section won't affect on the result of the program.

print <<~EOF
  This is the multiline string.
  You can write it.
EOF

print <<~`EOC`
  echo 'hello, world!'
EOC

# Array
fruits = Array.new(5, 'apple')
fruits[3] = 'banana'

at_exit do
  puts 'Bye!'
end

BEGIN {
   puts 'Hello!'
}

puts fruits.to_s

# function
# You don't need "return" if the return value is obvious
def add(num1 = 0, num2 = 0)
  num1 + num2
end

def try_symbol
  # symbol is like string
  book_title = :title
  puts "symbol: #{book_title}"

  # however symbol isn't the string
  puts "class for string: #{'hello'.class}"
  puts "class for symbol: #{:hello.class}"

  # When the symbol is identical, the object is identical
  str1 = 'hello'
  str2 = 'hello'
  puts "str: #{str1.object_id}, #{str2.object_id}"

  sym1 = :hello
  sym2 = :hello
  puts "symbol: #{sym1.object_id}, #{sym2.object_id}"

  # using symbols as hash keys
  # in the hash, you can append colon
  dog1 = { 'name' => 'max', 'type': 'collie' } # normal
  dog2 = { name: 'max', type: 'collie' } # symbol
  dog3 = { name: 'max', type: 'collie' } # symbol
  puts "hash with string key: #{dog1['name']}"
  puts "hash with symbol key: #{dog2[:name]}"
  puts "hash with symbol key: #{dog3[:name]}"
end

puts add 100, 200
try_symbol
