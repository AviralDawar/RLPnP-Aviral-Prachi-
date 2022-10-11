#!/usr/bin/env python
# coding: utf-8

import pandas as pd
from vowpalwabbit import pyvw
import numpy as np
import csv




def results_into_file(dates, states, bucket_values, actions):

	# collect about susceptible, infected, dead, recovered cases

	flattened_actions = []
	for i in range(len(actions)):
		for j in range(len(actions[i])):
			flattened_actions.append(actions[i][j])

	filename = 'contextual_output.csv'

	with open(filename, 'w') as csvfile:
		csvwriter = csv.writer(csvfile)
		csvwriter.writerow(['Date', 'State','Bucket_Value', 'Vaccine %', 'Amount of Vaccine'])

	index = 0
	while (index < len(dates)):
		with open(filename, 'a+') as csvfile:
			csvwriter = csv.writer(csvfile)

			date = dates[index]
			state = states[index] 
			csvwriter.writerow([date, state,bucket_values[index], flattened_actions[index], flattened_actions[index]*10000])

		index += 1
		
	print ("hi")
	

pth = "dataset/"
def contextual_bandits(Description):
	print (Description.file_path)
	pth1 = str(Description.file_path)
	vac_df = pd.read_csv(pth1)
	states = vac_df[Description.states].unique()
	num_states = len(states)
  
	print(vac_df)
	print(states)

	fields = ['Date', 'States', 'Action_Buckets', 'Bucket_Value']
	filename = "CB_BucketSize.csv"
	rows = []

	attr=[]
	no = Description.features
	for i in range (0,no):
		ele = Description.attributes[i]
		print(ele)
		attr.append(vac_df.columns.get_loc(ele))
  
  
	normalised_actions = []
	act = vac_df.columns.get_loc('Action')
	rew = vac_df.columns.get_loc('Reward')
	tot = len(vac_df)
	test = 75
	print(tot," ",test)
	tot = tot-num_states
  
	var = int(Description.bucket_size)
	vw = pyvw.vw("--cb "+str(var))
	### TRAINING ###
	actions_train=[]

	t=2 # 10000 initially

	while(t):
		t-=1
		for i in range(0,test,num_states):   #Training on 1st to 26th Dec
			arr=vac_df[i:i+num_states].to_numpy()    #i to i+num_states for num_states states on single date

			for s in range(0,num_states):          # s for num_states diff models for num_states diff states
				var1 = ""
				for k in range(0, len(attr)):
					var2 = ' ' + str(arr[s][attr[k]])
					var3 = var1+var2
					var1 = var3

				action=int(arr[s][act])
				reward=int(arr[s][rew])

				new_action = int(abs((10*action*var + num_states*var -5000)/10000))    # only for original action space of 1000 actions
				actions_train.append(new_action) 
				learn_example=str(new_action)+':'+str(-reward)+':'+str(0.9)+' |' + var1
				# print(learn_example)

				vw.learn(learn_example)
	actions_train_unique=np.unique(actions_train)
	print("unique action in training",actions_train_unique)

	## TESTING ###
	actions_test = []
	for i in range(136,tot,num_states):   # Testing on 27th Dec to 31st Jan
		arr=vac_df[i:i+num_states].to_numpy()    #i to i+num_states for num_states states on single date
		for s in range(num_states):          # s for num_states diff models for num_states diff states
			var1 = ""
			for k in range(0, len(attr)):
				var2 = ' ' + str(arr[s][attr[k]])
				var3 = var1+var2
				var1 = var3
			test_example='|'+var1
			a=vw.predict(test_example)
			#print(test_example)
			actions_test.append(a)
			ls = [arr[s][0],arr[s][1],a,Description.bucket_size]
			rows.append(ls)
			#print(a)
	actions_test_unique=np.unique(actions_test)
	
	with open(filename, 'w') as csvfile:
		csvwriter = csv.writer(csvfile)
		csvwriter.writerow(fields)
		csvwriter.writerows(rows)
  
	df = pd.read_csv(filename)
	print (df)

	j = 29
	mean_actions=[]
	normalised_actions=[]
	list_of_dates = [] 
	list_of_states = []
	bucket_values = []

	while j<31:
		i = var 
		df_Bucket=df[df.Bucket_Value==i] #Changing the Bucket Value here
		print (df_Bucket)

		date = '2020-12-'+str(j)
		df_date=df_Bucket[df_Bucket.Date==date] #Changing the date from here.
		print (df_date)

		# for state in states:
		# 	list_of_dates.append(date)
		# 	list_of_states.append(state)
		# 	bucket_values.append(i)

	
		data_states = {}
		for state in states:
			data_states["df_" + str(state)] = df_date[df_date.States==state]
		print (data_states)
	
		mean_act = {}
		for state in states:
			mean_act["mean_act_" + str(state)] = round(data_states["df_" + state]['Action_Buckets'].mean(),4)
			mean_actions.append(mean_act["mean_act_" + str(state)])

		print (mean_act)
	
		sum_mean_act = 0
		for key, value in mean_act.items():
			sum_mean_act += value

		print (sum_mean_act)
	
		ls = []
		normalised_action = {}
	
		for state in states:
			normalised_action["normalised_action_" + str(state)] = round(100*mean_act["mean_act_" + str(state)]/sum_mean_act,4)
			ls.append(normalised_action["normalised_action_" + str(state)])
			
		print (ls)
		print (normalised_action)

		normalised_actions.append(ls)

			#break
		j = j + 1
		#break

	"""
	j = 1
	#mean_actions=[]
	#normalised_actions=[]
	#list_of_dates = [] 
	#list_of_states = []
	#bucket_values = []

	print ("AHHHHHHHHHHHHHHH WE'RE STARTING!")
	while j<10:
		for i in range(200,501,100): #For Bucket Values 200, 300, 400 and 500
			df_Bucket=df[df.Bucket_Value==i] #Changing the Bucket Value here
			print (df_Bucket)

			date = '2021-01-0'+str(j)
			df_date=df_Bucket[df_Bucket.Date==date] #Changing the date from here.
			print (df_date)

			for state in states:
				list_of_dates.append(date)
				list_of_states.append(state)
				bucket_values.append(i)

      
			data_states = {}
			for state in states:
				data_states["df_" + str(state)] = df_date[df_date.States==state]
			print (data_states)
        
			mean_act = {}
			for state in states:
				mean_act["mean_act_" + str(state)] = round(data_states["df_" + state]['Action_Buckets'].mean(),4)
				mean_actions.append(mean_act["mean_act_" + str(state)])

			print (mean_act)
        
			sum_mean_act = 0
			for key, value in mean_act.items():
				sum_mean_act += value

			print (sum_mean_act)
        
			ls = []
			normalised_action = {}
      
			for state in states:
				normalised_action["normalised_action_" + str(state)] = round(100*mean_act["mean_act_" + str(state)]/sum_mean_act,4)
				ls.append(normalised_action["normalised_action_" + str(state)])
       			
			print (ls)
			print (normalised_action)

			normalised_actions.append(ls)

			#break
		j = j + 1
		#break
	
	j = 10
	#mean_actions=[]
	#normalised_actions=[]
	#list_of_dates = [] 
	#list_of_states = []
	#bucket_values = []

	print ("AHHHHHHHHHHHHHHH WE'RE STARTING!")
	while j<32:
		for i in range(200,501,100): #For Bucket Values 200, 300, 400 and 500
			df_Bucket=df[df.Bucket_Value==i] #Changing the Bucket Value here
			print (df_Bucket)

			date = '2021-01-'+str(j)
			df_date=df_Bucket[df_Bucket.Date==date] #Changing the date from here.
			print (df_date)

			for state in states:
				list_of_dates.append(date)
				list_of_states.append(state)
				bucket_values.append(i)

      
			data_states = {}
			for state in states:
				data_states["df_" + str(state)] = df_date[df_date.States==state]
			print (data_states)
        
			mean_act = {}
			for state in states:
				mean_act["mean_act_" + str(state)] = round(data_states["df_" + state]['Action_Buckets'].mean(),4)
				mean_actions.append(mean_act["mean_act_" + str(state)])

			print (mean_act)
        
			sum_mean_act = 0
			for key, value in mean_act.items():
				sum_mean_act += value

			print (sum_mean_act)
        
			ls = []
			normalised_action = {}
      
			for state in states:
				normalised_action["normalised_action_" + str(state)] = round(100*mean_act["mean_act_" + str(state)]/sum_mean_act,4)
				ls.append(normalised_action["normalised_action_" + str(state)])
       			
			print (ls)
			print (normalised_action)

			normalised_actions.append(ls)

			#break
		j = j + 1

	#print ("LENGTH: ", len(normalised_actions), len(list_of_dates), len(list_of_states))
	#print ("LENGTH: ", normalised_actions, list_of_dates)

	"""
	results_into_file(list_of_dates, list_of_states, bucket_values, normalised_actions)

	return normalised_actions,states
