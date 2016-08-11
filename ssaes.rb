require 'sinatra'
require 'sinatra/base'

class Ssaes < Sinatra::Base

	configure do
        	enable :cross_origin
        	set :allow_origin, :any
        	set :allow_methods, [:get, :post, :put, :delete]
	end

	get '/' do
  		erb :index
	end

end
