# couchbase-v-mongo
An evaluation of Couchbase and MongoDB from a development perspective.

## Components
### Vagrant
Each box is self contained, meaning it has its own copy of the data, REST server, and UI.
  1. 'mongodb'
  2. 'couchbase'
  
### Node.js
The middle tier, or data access layer, is written in Node.js with Express for the REST API server.

### AngularJS
The webapp is built with Angular, and is identical between the two environments. Gotta love REST APIs.

## Dependencies
1. Install Virtualbox: https://www.virtualbox.org/wiki/Downloads

2. Install Vagrant: http://www.vagrantup.com/downloads.html

3. Install necessary Vagrant plugins:

```sh
vagrant plugin install vagrant-hostmanager
vagrant plugin install vagrant-cachier
vagrant plugin install vagrant-berkshelf
```

4. Install Ansible

```sh
brew install ansible
```
5. Install Node.js Playbook

```sh
ansible-galaxy install nodesource.node
```

## Setup
TBA
