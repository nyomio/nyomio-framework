# Demo UI for the nyomio Framework

This demo ui simply adds the default user and organization management pages to 
an Anagular SPA (single page application).

The purpose of this app is to showcase how to use the Nyomio Framework.

All scripts are included to try the Nyomio Framework locally with everything that it provides.
 - SSO with keycloak
 - postgres
 - revisioned management of postgres table data
 - general user and organisation management features

# How to try?

## Prerequisites

You need to have `kubectl` and `helm` installed on your machine.

Shell scripts were tested on Mac and Linux.

## Run

Simply run
```
./try.sh prod
```
in this directory.

This will build all components and 
