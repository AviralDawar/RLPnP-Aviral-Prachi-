# VacSIM: Learning Effective Strategies for COVID-19 Vaccine Distribution using Reinforcement Learning

This repository contains all the necessary code and environment for implementing our VacSIM model. 

A COVID-19 vaccine is our best bet for mitigating the ongoing onslaught of the pandemic. However, vaccine is also expected to be a limited resource. An optimal allocation strategy, especially in countries with access inequities and temporal separation of hot-spots, might be an effective way of halting the disease spread. We approach this problem by proposing a novel pipeline VacSIM that dovetails Sequential Decision based RL models into a Contextual Bandits approach for optimizing the distribution of COVID-19 vaccine. Whereas the Reinforcement Learning models suggest better actions and rewards, Contextual Bandits allow online modifications that may need to be implemented on a day-to-day basis in the real world scenario. We evaluate this framework against a naive allocation approach of distributing vaccine proportional to the incidence of COVID-19 cases in five different States across India and demonstrate up to 9039 potential infections prevented and a significant increase in the efficacy of limiting the spread over a period of 45 days through the VacSIM approach. We also propose novel evaluation strategies including standard compartmental model-based projections and a causality preserving evaluation of our model. Since all models carry assumptions that may need to be tested in various contexts, we open source our model VacSIM and contribute a new reinforcement learning environment compatible with OpenAI gym to make it extensible for real-world applications across the globe  

**Read our paper** https://arxiv.org/abs/2009.06602
