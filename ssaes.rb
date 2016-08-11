require 'sinatra'
require 'sinatra/base'

class Ssaes < Sinatra::Base

	configure do
        	enable :cross_origin
        	set :allow_origin, :any
        	set :allow_methods, [:get, :post, :put, :delete]
	end

	get '/ssaes' do
  		erb :index
	end

	get '/' do
                'Its Working !!!'
        end
end
