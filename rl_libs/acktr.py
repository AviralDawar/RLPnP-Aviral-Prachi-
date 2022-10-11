import gym
import numpy as np
import pandas as pd
from stable_baselines import DQN, DDPG, ACKTR
from gym import spaces 
import copy
from collections import Counter
import math
import random
import csv
import os


def results_into_file(df, action_list, reward_list):
    #df = pd.read_csv(df)
    # print (df_acktr)
    # for ind in range(df_acktr.shape[0]):
    # #     if (df_acktr[ind][0] == '2020-12-01'):
    #         break

    
    ls  = list(df.columns.values)
    ls.append('Action')
    ls.append('Reward')
    
    print ("PRINTING")
    print (ls)
    print (len(ls))
    print (len(df))

    
    df = df.to_numpy()
    with open('./dataset/ACKTR_output.csv', 'w') as csvoutput:
        csvwriter = csv.writer(csvoutput)
        csvwriter.writerow(ls)
        for i in range(0,len(df)):
            temp = []
            for j in range(0,len(ls)-2):
                print (i, j)
                temp.append(df[i][j])

            if(i >= len(action_list)):
                temp.append(0)
                temp.append(0)
            else:
                temp.append(action_list[i])
                temp.append(reward_list[i])
            csvwriter.writerow(temp)

    return './dataset/ACKTR_output.csv'


    """
    #df = df.to_numpy()
    with open('./dataset/ACKTR_output.csv', 'w') as csvoutput:
        csvwriter = csv.writer(csvoutput)
        csvwriter.writerow(ls)
        for i in range(0,len(df)):
            temp = []
            for j in range(0,len(ls)):
                temp.append(df[i][j])
            if(i >= len(action_list)):
                temp.append(0)
                temp.append(0)
            else:
                temp.append(action_list[i])
                temp.append(reward_list[i])
            csvwriter.writerow(temp)
    return './dataset/ACKTR_output.csv'
    """






# creating an environment: our custom environment, built to solve our problem
class StatesEnv(gym.Env):

	# mode of render function: human indicates that output on console will be understandable
	metadata = {'render.modes':['human']}

	def __init__(self, s, episodes, total, feature_ratios, reward_col_ratio, buckets, reward_col):    #susceptible ratio is ratio of susceptible people in that state/total susceptible people combining all states

		self.states = s #no of states
		self.observation_space = spaces.Box(np.array([0]*(len(feature_ratios))), np.array([1]*(len(feature_ratios))), shape=((len(feature_ratios)),), dtype = np.float32)	#continuous observation space

		# Action space is a discrete valued space. number of actions = number of buckets
		self.action_space = spaces.Discrete(buckets)	#discrete action space

		self.curr_step = 1
		self.done = False
		
		# (5x100 matrix)
		self.valueMap = np.zeros((self.states, 100))
		self.total = total #total number of vials available in 1 batch = batch size 
		self.episodes = episodes

		# maybe number of vaccines received for each state??
		self.received = [0]*self.states

		# no idea what this is??
		self.states_cond = []
		self.action_list = None

		self.susc = [0]*self.states
		#self.confirmed=confirmed
		#self.dr=dr
		#self.rr=rr 
		#self.population=population
		#self.reward_ratio=reward_col_ratio
		#self.bed=bed
		#self.icu=icu
		#self.ventilator=ventilator
		#self.feature_ratios = feature_ratio.values()
		self.feature_ratios = feature_ratios

		# what is old??
		#self.old=old
		self.buckets=buckets
		#self.total_susceptible=total_susceptible
		self.total_reward_col=reward_col
		self.reset()

	# function to return integer casted n
	def get_discrete_int(self, n):
		discrete_int = int(n)
		return discrete_int

	# resets the state ans other variables of the environment to the start state
	def reset(self):
		self.curr_step = 1
		self.done = False

		# we are starting with 10 lakh vaccines to distribute
		self.total = 1000000          #10 lakh vaccines

		# array of all values of features 
		#self.states_cond =  np.array(self.feature_ratios.append(self.reward_ratio))
		self.states_cond = self.feature_ratios
		#self.states_cond.append(self.reward_ratio)
		self.states_cond = np.array(self.states_cond)

		# returning a copy of the array
		return copy.deepcopy(self.states_cond)
        
	# step function: takes an action variable and return a list of 4 things (next state, reward for the current state, whether episode is done, etc..additional info) 
	def step(self, action):
		# action was set to None at the beginning	
		self.action_list = action

		# gets reward
		reward = self.get_reward()

		# ratio of action to total number of actions 
		#vaccine_allotted = (action/self.buckets)*self.total
		resources_allotted = (action/self.buckets)*self.total

		# new_susceptibility ratio after vaccine allotment 
		#new_susceptible_ratio = ((self.susceptible_ratio*total_susceptible)-vaccine_allotted)/(total_susceptible-vaccine_allotted)
		#new_reward_ratio = ((self.reward_ratio*self.total_reward_col)-resources_allotted)/(self.total_reward_col-resources_allotted)
		new_reward_ratio = ((self.states_cond[-1]*self.total_reward_col)-resources_allotted)/(self.total_reward_col-resources_allotted)
		#self.feature_ratios[len(self.feature_ratios)-1] = ((self.feature_ratios[len(self.feature_ratios)-1]*self.total_susceptible)-vaccine_allotted)/(self.total_susceptible-vaccine_allotted)

		# setting new susceptible ratio
		#self.states_cond[len(self.states_cond)-1] = new_susceptible_ratio
		print (self.states_cond)
		print (self.states_cond.shape)
		self.states_cond[-1] = new_reward_ratio
		#self.states_cond[len(self.states_cond)-1] = self.feature_ratios[len(self.feature_ratios)-1]

		# increment episode
		if self.curr_step == self.episodes:
			# done with all episodes
			self.done=True
		else:
			# else increment to next episode
			self.done=False
			self.curr_step+=1
        
		return self.states_cond, reward, self.done, {'action_list': self.action_list, 'distribution':(self.action_list*(1/self.buckets))+(0.5/self.buckets), 'episode_number': self.curr_step}

   	# function to return reward 
	def get_reward(self):
		reward = 0              

		# dividing action values by number of actions that can be taken
		A=(self.action_list*(1/self.buckets))

		# this is susceptible ratio??
		#S=self.states_cond[len(self.states_cond)-1]                                                    

		# how is the reward being calculated??
		#reward = (100 * math.exp((-(A-S)**2)/0.0001))
		reward = (100 * math.exp(-A))
		return reward 

	def close(self):
        	pass


def ACKTR_run(inp):

    #print (inp.states)
    #print (inp.features)
    #print (inp.attributes)
    #print (inp.bucket_size)
    #print (inp.epochs)
    #print (inp.episodes)
    #print (inp.resources)
    #print (inp.reward)
    #print (inp.model)
    #print (inp.file_path)

    print (os.path.abspath(inp.file_path))

    # reading from data collected in the form of csv
    df=pd.read_csv(inp.file_path,skipinitialspace=True,index_col=None)
    print (df)
    print (df.to_numpy().shape)

    # finding number of states in dataset
    states = df[inp.states].unique()
    num_states = len(states)

    # empty action list and reward list
    action_list=[]
    reward_list=[]

    attr=[]
    no = inp.features

    # Adding all feature columns into list
    for i in range (0, no):
        ele = inp.attributes[i]
        print(ele)
        attr.append(df.columns.get_loc(ele))

    print (attr)

    reward_col = inp.indicator
    reward_col_index = df.columns.get_loc(reward_col)
    print (reward_col_index)

    # iterating through file
    for i in range(0,75,num_states):   # change according to how many days the model needs to be trained
        
        arr=df[i:i+num_states].to_numpy()    

        feature_totals = {}
        for feature in attr:
            if df.columns[feature] != 'Death Rate' and df.columns[feature] != 'Recovery Rate':
                feature_totals["total_" + df.columns[feature].lower().replace(" ", "_")] = sum(arr[:, feature])

        #print (total_confirmed, total_population, total_susceptible, total_beds, total_icu, total_venti, total_old)
        total_reward_col = sum(arr[:, reward_col_index])
        print (total_reward_col)
        print (feature_totals)

        # iterating through each state
        for s in range(num_states):          # looping for 5 states

            feature_ratios = []                                             
            for feature in attr:                                            
                feature_ratios.append(arr[s][feature])
        	
            reward_col_ratio = arr[s][reward_col_index]
            #print (reward_col_ratio)

            #print (feature_ratios)
            feature_ratios.append(reward_col_ratio)

            # initializing environment: we are taking 1000 buckets??
            #env=StatesEnv(1,1,inp.episodes,confirmed_ratio,dr,rr,population_ratio,susceptible_ratio,bed_ratio,icu_ratio,venti_ratio,old_ratio,1000, total_susceptible)
            #env=StatesEnv(1,1,inp['episodes'], feature_ratios, 1000, reward_col_ratio, total_reward_col)
            #env=StatesEnv(1,inp['episodes'], 100000, feature_ratios, reward_col_ratio, 1000, total_reward_col)
            env=StatesEnv(1,inp.episodes, inp.total_resources, feature_ratios, reward_col_ratio, 1000, total_reward_col)
            print (env)
            
            # DQN model
            model = ACKTR('MlpPolicy', env, verbose=0,n_steps=1, seed=1, learning_rate=1e-3)
            model.learn(total_timesteps=int(inp.epochs), log_interval=int(inp.epochs))

            obs = env.reset()
            print (obs)

            action, _states = model.predict(obs)
            print (action, _states)
            obs, reward, done, info = env.step(action)
            print (action, reward)
            action_list.append(action)
            reward_list.append(reward)


    #get actions and rewards                                                        
    #print(action_list,reward_list)
    #return (action_list,reward_list)
    results_into_file(df, action_list, reward_list)

    return action_list,reward_list
