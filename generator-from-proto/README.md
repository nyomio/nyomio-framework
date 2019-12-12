# datatypes
Helper project to generate code based on data types defined in proto format.
Uses protoc-gen-gotemplate: https://github.com/moul/protoc-gen-gotemplate

## prerequirements
* protoc executable must be found in system path
* protoc-gen-gotemplate executable must be found in system path

### install protoc-gen-gotemplate
* follow instruction from https://github.com/moul/protoc-gen-gotemplate#install
* build project with `go build`
* copy protoc-gen-gotemplate executable to a place which is in $PATH

## usage
* `protoc --gotemplate_out=./out proto/*.proto`
* the result can be found in out/generated

