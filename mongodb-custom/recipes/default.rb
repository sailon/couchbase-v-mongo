include_recipe "mongodb::default"

execute 'import_data' do
  command 'mongoimport -d cvm -c posts --file /vagrant/data/newPosts.json --host=mongodb.vagrant --jsonArray'
end

execute 'create_indexes' do
  command 'mongo /vagrant/scripts/createMongoIndexes.js'
end

execute 'install_packages' do
  command 'cd /vagrant/mongo-express && npm install'
end

execute 'run_app' do
  command 'cd /vagrant/mongo-express && nohup npm start > mongoApp.log &'
end