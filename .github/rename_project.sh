#!/usr/bin/env bash
while getopts n: flag
do
    case "${flag}" in
        n) name=${OPTARG};;
    esac
done

echo "Project Name: $name";
echo "Renaming project..."

original_name="pengi-template"
for filename in $(git ls-files) 
do
    sed -i "s/$original_name/$name/g" $filename
    echo "Renamed $filename"
done

echo "Project renamed successfully!"
