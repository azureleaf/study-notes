def get_grade(score)
  if score > 80
    'A'
  elsif score <= 80 && score > 50
    'B'
  else
    'C'
  end
end

puts get_grade 70
