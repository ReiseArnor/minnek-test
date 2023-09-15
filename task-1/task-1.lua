local function print_table(arr)
    for _, value in pairs(arr) do
        io.write(tostring(value) .. " ")
    end
end

local function is_special_char(item)
    local normal_letter = "[%a]"
    if type(item) == "string" then
        if not string.match(item, normal_letter) then
            --print(item .. " is special")
            return true
        end
    end
    return false
end

local function reverse(arr)
    local special_chars = {}
    local temp_arr = {}

    for index, value in ipairs(arr) do
        if is_special_char(value) then
            table.insert(special_chars, { index, value })
            goto continue
        end

        table.insert(temp_arr, value)
        ::continue::
    end

    -- sort non special characters
    for i = 1, #temp_arr / 2, 1 do
        temp_arr[i], temp_arr[#temp_arr - i + 1] = temp_arr[#temp_arr - i + 1], temp_arr[i]
    end

    --io.write("\ntemp_arr: ")
    --print_table(temp_arr)
    local result = {}

    -- inserting sorted non special chars
    for index, value in ipairs(temp_arr) do
        table.insert(result, index, value)
        --print_table(result)
    end

    -- inserting special chars in their absolute pos
    for _, value in pairs(special_chars) do
        table.insert(result, value[1], value[2])
    end

    return result
end

local function default()
    local input = { "n", 2, "&", "a", "l", 9, "$", "q", 47, "i", "a", "j", "b", "z", "%", 8 }
    local expected = { 8, "z", "&", "b", "j", "a", "$", "i", 47, "q", 9, "l", "a", 2, "%", "n" }

    io.write("\nentrada: ")
    print_table(input)
    io.write("\n")

    local result = reverse(input)

    io.write("\nresultado esperado: ")
    print_table(expected)

    io.write("\nresultado obtenido: ")
    print_table(result)
end

if not arg[1] then
    default()
else
    local input = {}
    local expected = {}

    for item in string.gmatch(arg[1], "([^,]+)") do
        -- in case is a number
        if tonumber(item) then
            table.insert(input, tonumber(item))
            goto pass
        end

        table.insert(input, item)
        ::pass::
    end

    if arg[2] then
        for item in string.gmatch(arg[2], "([^,]+)") do
            table.insert(expected, item)
        end
    end

    io.write("\nentrada: ")
    print_table(input)

    local result = reverse(input)

    if arg[2] then
        io.write("\nresultado esperado: ")
        print_table(expected)
    end

    io.write("\nresultado obtenido: ")
    print_table(result)
end
