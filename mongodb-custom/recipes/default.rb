include_recipe "mongodb::default"

execute 'import_data' do
  command 'mongoimport -d cvm -c posts --file /vagrant/data/newPosts.json --host=127.0.0.1 --jsonArray'
end

execute 'create_indexes' do
  command 'mongo /vagrant/scripts/createMongoIndexes.js'
end
