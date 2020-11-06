# frozen_string_literal: true

def edit_array
  print "\n*** Array ***\n\n"

  fruits = []
  puts "empty: #{fruits}"

  fruits = %w[apple banana grape]
  fruits.push('melon')
  fruits[2] = 'apple'
  fruits[fruits.length - 1] = 'grape'
  puts "bracket: #{fruits}"

  # Fill
  # Values will be "nil" if not specified
  fruits = Array.new(5, 'banana')
  fruits[2] = 'apple'
  puts "apple index: #{fruits.index('apple')}"
  puts "fruits basket: #{fruits}"
  puts "sliced: #{fruits.slice(3, 1)}"

  # Seemingly, "e" is index
  nums = Array.new(5) { |e| e * 2 }
  puts "Content: #{nums}" # 0, 2, 4, 6, 8

  # range
  nums = Array(0..9)
  puts "range: #{nums}" # 0, 2, 4, 6, 8
end

def edit_hash
  print "\n*** Hash ***\n\n"

  months = { '1' => 'January', '2' => 'February' }
  months['3'] = 'March'
  puts "months: #{months}"

  months.delete('1')
  puts "months (deleted): #{months}"
  keys = months.keys
  puts "Keys: #{keys}"
  puts "Length: #{months.length}"

  new_months = { '4': 'April', '5': 'May' }
  merged = months.merge(new_months)
  puts merged
  months.merge!(new_months) # merge inplace with bang!
  puts months

  months.clear
  puts "empty hash? #{months.empty?}"
end

def iterate_collection
  print "\n*** Iteration ***\n\n"

  nums = Array(0..5)

  nums.each do |num|
    puts num
  end

  # doubled_nums.map do |num|
  #   2 * num
  # end

  result =  [1, 2, 3, 4, 5].map { |n| n * 2 if n > 2 }
  puts "map result: #{result}"

  result =  [1, 2, 3, 4, 5].collect { |n| n * 2 if n > 2 }
  puts "collect result: #{result.reject { |n| n.nil? }}"

  result = []
  [1, 2, 3, 4, 5].each do |n|
    result.append(n)
  end
  puts "each result: #{result}"

  puts { nums.collect { |num| num * 2 } }

  # iterate over hash
  {name: 'john', country: 'uk'}.each { |key,value| puts "#{key} is #{value}" }
end

# edit_array
# edit_hash
iterate_collection
