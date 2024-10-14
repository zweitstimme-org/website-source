---
title: "About our forecast models"
date: 2021-08-18T22:33:16+02:00
draft: false
bibFile: "data/bibliography.json"
---

For us as scientists, it is important that our forecasts are transparent and comprehensible. 

Since 2017, we have published several (peer-reviewed) scientific articles on our model. With the publications, we also make our code publicly available.

In order to reflect both longer-term party leanings and current political sentiments, our [second vote model](#the-second-vote-model) consists of two components - a structural component and a survey component. In addition, our [constituency model](#the-constituency-model) allows us to calculate how likely a candidate from each party is to win a constituency.  

A more detailed description and evaluation of the model for the 2017 federal election can be found [here](http://2017.zweitstimme.org/index_en.html) and (with further developments) in these publications: {{< cite "PVS2017" >}}, {{< cite "PA2019" >}}, and {{< cite "PVS2020" >}}. Our prediction for the 2021 federal election will be published in [PS: Political Science & Politics](https://www.cambridge.org/core/journals/ps-political-science-and-politics) before the election. 

The code for our models can be found in {{< cite "codePA2019" >}}, {{< cite "codePS2021" >}} or on our [GitHub page](https://github.com/zweitstimme-org).

### Publications & Code:

{{< bibliography >}}

### Details on our Models

#### The Second-Vote Model

The structural component of our model draws on factors that have proven relevant for predicting election outcomes in the past (since 1949). These include, for example, the performance of parties in past elections, historical polling data, and information on whether a party provided the chancellor. In other words, the structural component learns from the regularities of all past federal elections. Thus, having this information early (as early as 200 days before the election) allows us to predict the outcome of the election early.

However, the structural component alone is often not sufficient to reflect short-term readjustments in the party system or fluctuations in the political mood. We therefore use published values of the so-called Sunday poll to account for the dynamics of an election. To put it simply, for the actual forecast we mix information about the regularities of past elections with what we can observe in the polls at the moment. While the structural component of the model remains stable, we update our forecast with each new poll released.

Depending on how far in the future the election date is, the two components of our model are weighted differently. For example, if the election is still very far in the future, the prediction based solely on polls is very uncertain because they are very volatile over time. Accordingly, more weight is initially given to the prediction of the structural model. As election day approaches, the model's confidence in the survey component increases as it becomes more accurate. Our forecast thus mostly represents a compromise between what one would expect based on historical data and what one currently observes in the polls. 

Our model is estimated using a so-called MCMC algorithm. Figuratively speaking, the election outcome is simulated many times; for example, 100,000 times. These simulations can then be used to calculate probabilities for all events that are directly related to the predicted party shares. For example, if the CDU/CSU is ahead of the SPD in about 80,000 of the simulations, this corresponds to an estimated 80% probability that the CDU/CSU will do better than the SPD in the election.


#### The constituency model

On the ground in the constituencies, the election campaign often focuses on the question: Who will be directly elected to the next Bundestag? The first vote also directly determines the composition of the Bundestag. The 299 constituency winners receive their mandate in the next Bundestag - regardless of how their party performs overall. So it is definitely of interest who wins in which constituency. It is at least as exciting to have an estimate of which constituencies could be particularly close before election night. Using our constituency model, we can calculate how likely each party's candidate is to win the constituency.

Our constituency forecast is based on several assumptions that take us from our simulated second vote results to the 299 potential constituency winners:in.

First, we calculate the nationwide proportional "swing" (i.e., the change in outcome for a party between two elections) between the 2017 election result and each of our simulation results. For example, the CDU/CSU had won 30.2% of the second votes in 2017. If the CDU/CSU now has 25% in a simulation result of our model, that is 5.2 percentage points less than in 2017, or proportionally -17.2% (note the difference between percentages and percentage points).

We then transfer this proportional swing to the constituency results (converted to constituencies for 2021) of 2017, obtaining simulated distributions of second votes in each of the 299 constituencies. For example, if the CDU/CSU had 50% of the second votes in a constituency in 2017, it is now 41.4% with the assumption of proportional swing. If the CDU/CSU had only 35% of the second votes in another constituency in 2017, it is now still 28.9%. We calculate this swing for all parties, all constituencies and all simulation runs.

To get from the second votes in the constituency to first votes, we need another assumption: how do first and second votes in the constituency relate to each other? To do this, we first assume that the ratio of first to second votes in the constituency will be the same as in 2017. We replace this ratio in constituencies where previous constituency winners do not run again with an average candidate from the same party in the same state. We do the same for popular non-winners who do not run again. Thus, we now get simulation distributions for all candidates in each constituency. For each simulation we then get one person who wins the direct mandate in the constituency. To calculate probabilities, we add up the constituency winners of the parties across all simulations and divide the sum by the number of our simulations.

This is also the difference to other constituency forecasts. We can say something about how (in)certain our predictions of the constituency winners:in are. This works because, as described above, we calculate a probability for each of the people running in a constituency to win their constituency.