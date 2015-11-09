include_recipe "couchbase::server"

couchbase_bucket "cvm" do
  memory_quota_percent 1
  replicas false

  username "Administrator"
  password "password"
end

execute 'import_data' do
  command '/opt/couchbase/bin/cbdocloader -u Administrator -p password -n 127.0.0.1:8091 -b cvm /vagrant/data/couchbase'
end