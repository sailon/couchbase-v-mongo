# -*- mode: ruby -*-
# # vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.ssh.insert_key = false

  if Vagrant.has_plugin?("vagrant-hostmanager")
    config.hostmanager.enabled = true
    config.hostmanager.manage_host = true
    config.hostmanager.ignore_private_ip = false
    config.hostmanager.include_offline = true
  end

  if Vagrant.has_plugin?("vagrant-cachier")
    config.cache.scope = :machine
  end

  if Vagrant.has_plugin?("vagrant-berkshelf")
    config.berkshelf.enabled = true
  end

  if Vagrant.has_plugin?("vagrant-omnibus")
    config.omnibus.chef_version = 'latest'
  end

  config.vm.define "mongodb" do |vmconfig|
    vmconfig.vm.box = "ubuntu/trusty64"
    vmconfig.vm.provider "virtualbox"

    vmconfig.vm.hostname = "mongodb.vagrant"
    vmconfig.vm.network :private_network, ip: "192.168.56.42"
     
    vmconfig.vm.provision "chef_solo" do |chef|
      chef.add_recipe "nodejs"
      chef.add_recipe "mongodb-custom"
    end
  end

  config.vm.define "couchbase" do |vmconfig|
    vmconfig.vm.box = "ubuntu/trusty64"
    vmconfig.vm.provider "virtualbox" do |v|
      v.memory = 4096
    end

    vmconfig.vm.hostname = "couchbase.vagrant"
    vmconfig.vm.network :private_network, ip: "192.168.56.43"
     
    vmconfig.vm.provision "ansible" do |ansible|
      ansible.playbook = "couchbase.yml"
    end
  end
end