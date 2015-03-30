drop database ifactor;
create database ifactor default character set utf8;
grant all privileges on ifactor.* to 'ifactor'@'localhost' identified by 'ifactor' with grant option;
