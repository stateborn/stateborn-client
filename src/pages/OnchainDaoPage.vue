<template>
  <div style="background-image: url('/senate.webp'); background-size: cover; background-attachment: fixed ">
    <QPage class="text-grey-5" :class="$q.platform.is.mobile ? ' text-subtitle2' : 'text-subtitle1'" :style="$q.platform.is.mobile ? 'line-height: 25px' : ''">
      <div class="row items-center justify-center q-pt-lg q-pa-xs" :style="$q.platform.is.mobile ? 'background: rgb(0, 0, 0, 0.76) !important;' : 'background: rgb(0, 0, 0, 0.86) !important;'">
        <div class="col-lg-3 col-xs-auto items-center" v-if="!$q.platform.is.mobile">
          <q-list separator class="q-ma-lg text-grey-6">
            <div v-for="item in items">
              <q-item-label header v-if="item.isLabelOnly">{{ item.label }}</q-item-label>
              <q-item v-else dense clickable v-ripple  @click="scrollToElement(item.scrollTo)" :active="item.active" active-class="yellowItem">
                <q-item-section avatar v-if="item.icon !== ''">
                  <q-icon  size="xs" :name="item.icon" />
                </q-item-section>
                <q-item-section avatar v-if="item.img !== ''">
                  <q-img :src="item.img" style="height: 22px; width:22px"></q-img>
                </q-item-section>

                <q-item-section class="text-subtitle2">{{item.label}}</q-item-section>
              </q-item>
              <q-separator v-if="item.separatorAfter" color="grey-9"></q-separator>
            </div>
          </q-list>
        </div>
        <div class="col-lg-9 col-xs-grow">
          <q-scroll-area :style="`height: ${scrollHeight}px; width:100%;`" ref="scrollAreaRef" :bar-style="barStyle" :thumb-style="thumbStyle" @scroll="onScroll">
            <div class="row">
              <div class="col-lg-9 col-xs-12">
                <div class="q-pa-xs">
                  <div class="row" >
                    <div class="col-12">
                      <div class="q-pa-lg">
                        <div class="text-center text-h1" id="statebornProtocol">
                          Stateborn protocol
                        </div>
                        <div class="text-overline text-center q-pb-md text-sub" >in 60 seconds</div>
                      </div>
                      Stateborn on-chain DAO is a EVM compatible, smart contracts based, DAO treasury wallet. DAO can own
                      assets like native blockchain cryptocurrency (e.g. ETH), ERC-20 or NFT tokens.
                      Stateborn DAO is non-permissioned - it means there is no owner of the DAO treasury.
                      There is not a single person or group of people (using multisig) who are in any control of DAO
                      treasury.
                      DAO assets are 100% controlled by on-chain proposals, which can be submit by anyone.
                      Passed proposals can transfer DAO assets to any address.
                      Proposals are voted by off-chain voting which is no-cost (free), fast and cryptographically secured.
                      Users (addresses) owning a DAO governance token can create and vote on off-chain proposals.
                      Both off-chain + on-chain components create cryptography and game theory based system which we describe
                      as stateborn protocol.
                    </div>
                  </div>
                  <div class="row q-mt-lg">
                    <div class="col-12">
                      <div class=" text-center q-pb-md" :class="$q.platform.is.mobile ? 'text-h2' : 'text-h2'">
                        off-chain voting + on-chain treasury
                      </div>
                      DAO on-chain treasury is controlled by on-chain proposals transfer transactions which ideally should be based
                      on off-chain voting.
                      Execution of on-chain proposal transfers depends on on-chain voting. Everyone can vote on on-chain
                      proposal, but every
                      vote requires collateral. When on-chain proposal ends, majority of voters get collateral of minority
                      of voters. Economic incentive of collateral
                      as reward involve various participants in on-chain voting process. If on-chain proposal gets no vote
                      against,
                      or more votes for than against - can be executed by anyone. When on-chain proposal gets the same or more against
                      votes than for votes - is rejected.
                      on-chain proposal voting is not related to off-chain proposals but off-chain voting result is a
                      reference for
                      on-chain voting decision.
                    </div>
                  </div>

                  <div class="row q-mt-lg ">
                    <div class="col-12 ">
                      <div class="row justify-center ">
                        <div class="col-12 justify-center text-center">
                          <q-img src="/mechanics2.png" :style="$q.platform.is.mobile ? 'width: 80px' : 'width: 120px'"/>
                        </div>
                      </div>
                      <div class="q-pa-lg">
                        <div class="text-center text-h1" id="mechanics">
                          Mechanics
                        </div>
                        <div class="text-overline text-center q-pb-md text-sub" >of stateborn protocol</div>
                      </div>
                      Stateborn protocol defines off-chain + on-chain stateborn DAOs working principles and dependencies.
                      It is set of rules and techniques which aims to allow manage non-permissioned on-chain DAOs treasury
                      by off-chain governance (voting) based communities. It is implemented as set of smart-contracts
                      deployed to blockchan network and cryptographically secured,
                      IPFS based, third party trust minimum off-chain voting platform. <a href="https://stateborn.org" target="_blank">stateborn.org</a> implements stateborn
                      protocol. <br><br>

                      Stateborn DAO can be only off-chain, or off-chain + on-chain.
                      <ul>
                        <li>
                          <b>off-chain</b> only DAO is a dedicated to communities which
                          wants to utilize no-cost, fast, secure and cryptographically secured off-chain voting using
                          stateborn platform
                        </li>
                        <li>
                          <b>off-chain + on-chain</b> DAO is dedicated to communities who additionally wants to utilize
                          non-permissioned on-chain DAO treasury, owning and managing assets like cryptocurrency, ERC-20 tokens or NFTs
                        </li>
                      </ul>
                      off-chain DAO is not technically related to on-chain DAO treasury. off-chain DAO can be created without on-chain DAO treasury.
                      on-chain DAO treasury smart-contracts can be deployed to blockchain network without off-chain DAO, however <a href="https://stateborn.org" target="_blank">stateborn.org</a> doesn't support that.<br><br>

                      This document focuses on on-chain DAO treasury overview. off-chain DAO proposal and voting process and components are described in detail here:
                      <router-link to="/about" span class="text-underline text-bold">ABOUT STATEBORN</router-link><br><br>

                      on-chain DAO treasury governance is non-permissioned and ideally all decisions should be based on DAO off-chain voting.
                      off-chain DAO proposal voting results are a reference for on-chain DAO treasury governance, but on-chain DAO treasury
                      smart contracts don't operate or process off-chain DAO proposals.<br><br>

                      Stateborn DAO model is based on a division, where governance decisions obtaining process is based on off-chain (no-cost) voting,
                      and DAO treasury assets are controlled by non-permissioned smart-contracts. Management of DAO treasury assets is technically
                      independent from DAO off-chain voting and is based on a dedicated logic utilizing smart-contracts security, immutability and
                      blockchain common game theory, economic incentive driven mechanics.

                      <div class="q-pa-lg">
                        <div class="text-h1 text-center q-pt-lg">DAO</div>
                        <div class="text-overline text-center q-pb-md text-sub" >lifecycle</div>
                      </div>

                      The lifecycle of stateborn DAO from DAO creation to proposal execution, described below, illustrates
                      the mechanics of stateborn protocol, its features, challenges, risks and solutions.
                      <div class="row items-center q-pt-lg">
                        <div class="col-lg-2 col-xs-grow text-center">
                          <q-icon name="fa-solid fa-1" :size="$q.platform.is.mobile ? 'md' : 'xl'"></q-icon>
                        </div>
                        <div class="col-lg-10 col-xs-grow justify-center">
                          <div class="q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="creation">
                            off-chain + on-chain DAO creation
                          </div>
                          Stateborn off-chain DAO is a basic component of stateborn protocol. It can be created by anyone using
                          <a href="https://stateborn.org" target="_blank">stateborn.org</a> platform, the only requirement is providing a governance token - ERC-20 or NFT.
                          off-chain DAO allows to create off-chain proposals. DAO governance tokens owners can vote on proposals.
                          All off-chain DAO data like proposals and votes are immutable, cryptographically secured data saved in IPFS - open, distributed data storage.
                          off-chain DAO creation is free. Proposals creation and voting are also free.<br><br>

                          on-chain DAO treasury (also referred below as on-chain DAO) is additional, optional component of stateborn DAO which can be additionally created
                          by anyone using <a href="https://stateborn.org" target="_blank">stateborn.org</a> platform.
                          on-chain DAO treasury is a set of smart-contracts deployed to EVM compatible blockchain network, for
                          example Ethereum. It can control cryptocurrency (e.g. Ether), ERC-20 or NFT tokens.
                          These assets are in exclusive control of on-chain DAO smart contract and dedicated functions
                          allow to transfer these assets from DAO treasury to any address.
                          Transferring DAO assets requires creating on-chain proposal, which describes "what, how many and
                          to whom" given assets should be transferred.
                          on-chain DAO is non-permissioned - it means there is no single owner of the DAO treasury, no
                          entity, person or group of people (multisig) who manage DAO treasury assets.
                          DAO assets are 100% controlled by "on-chain proposals", which can be submit by anyone.
                          on-chain DAO smart-contracts have multiple parameters and configuration options related to
                          on-chain proposals management.<br><br>

                          Once deployed to the blockchain network, on-chain DAO treasury is ready to be used.
                          Its address can be used to receive assets and assets management can be done by creating proposals.
                        </div>
                      </div>
                      <q-separator color="grey-9" class="q-mt-md q-mb-md"></q-separator>
                      <div class="row items-center ">
                        <div class="col-lg-2 col-xs-grow text-center">
                          <q-icon name="fa-solid fa-2" :size="$q.platform.is.mobile ? 'md' : 'xl'"></q-icon>
                        </div>
                        <div class="col-lg-10 col-xs-grow justify-center">
                          <div class="q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="proposalCreation">
                            off-chain DAO proposal creation
                          </div>
                          on-chain DAO treasury should be governed by off-chain proposals.
                          off-chain DAO proposals allow DAO community to propose ideas and vote on them.
                          DAO off-chain governance is based on DAO governance token, which can be ERC-20 token or NFT.
                          Users owning these tokens can create proposals and vote on them.

                          off-chain proposal created with stateborn platform can contain blockchain transaction data,
                          which describes transfer of on-chain DAO treasury assets to any address.
                          Such transaction, which can be created and submitted by anyone creates on-chain
                          proposal.<br><br>

                          off-chain proposals are not technically related to on-chain proposals.
                          Creating on-chain proposals can be done by anyone, even if there is no off-chain proposal
                          created.
                          off-chain proposals are a tool, which allows to measure/obtain DAO community will/actions and
                          reflect it on-chain.

                          Once off-chain proposal which contains assets transfer transaction passes, on-chain proposal
                          describing assets transfer is created.
                        </div>
                      </div>
                      <q-separator color="grey-9" class="q-mt-md q-mb-md"></q-separator>

                      <div class="row items-center">
                        <div class="col-lg-2 col-xs-grow text-center">
                          <q-icon name="fa-solid fa-3" :size="$q.platform.is.mobile ? 'md' : 'xl'"></q-icon>
                        </div>
                        <div class="col-lg-10 col-xs-grow justify-center">
                          <div class="q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="onchainProposalCreation">
                            on-chain DAO proposal creation
                          </div>
                          on-chain DAO proposal is a smart-contract which describes assets transfer from DAO treasury to any address.
                          It has own lifecycle and the transfer of DAO treasury assets is not immediate after on-chain proposal creation.
                          on-chain proposal smart-contract includes all data required to execute the transfer from DAO treasury.
                          Off-chain proposal result IPFS hash and result merkle root hash saved in smart-contracts are a reference to off-chain proposal voting result.
                          It should be used for anyone who wants to verify if on-chain proposal is legit and reflects the will of DAO community.<br><br>
                          Creating on-chain proposal requires collateral (e.g. 0.1 ETH) - its requirements are specified in DAO smart contract (default 0.1 of native blockchain cryptocurrency, e.g. 0.1 ETH, 0.1 MATIC).
                          Creating proposal without collateral is not possible.
                          Collateral is provided by proposal on-chain submitter.
                          The collateral is controlled by on-chain proposal smart contract rules.<br><br>

                          Once on-chain proposal is created, it's in challenge period which lasts for predefined amount of time (default 3 days).

                          <q-banner dense class="q-mt-md q-mb-xs state "
                                    style="background: rgb(255, 65, 54, 0.08) !important;">
                            <div class="row">
                              <div class="col-12 text-bold " :class="$q.platform.is.mobile ? 'text-h2' : 'text-h5'">
                                Is off-chain proposal required to create on-chain proposal of transferring DAO assets?
                              </div>
                            </div>
                            <div class="row q-pt-xs">
                              <div class="col-12" :class="$q.platform.is.mobile ? 'text-subtitle2' : 'text-subtitle1'">
                                No.
                                Anyone can submit on-chain DAO proposal of transferring DAO assets.
                                It can be done by honest or any kind of malicious actor like hacker, scammer, DAO
                                saboteur, etc.
                                Nevertheless creating on-chain proposal of transferring DAO assets always requires
                                collateral defined by DAO smart contract.
                                Below we explain further this problem and how stateborn protocol solves it.
                              </div>
                            </div>
                          </q-banner>
                        </div>
                      </div>

                      <q-separator color="grey-9" class="q-mt-md q-mb-md"></q-separator>

                      <div class="row items-center ">
                        <div class="col-lg-2 col-xs-grow text-center">
                          <q-icon name="fa-solid fa-4" :size="$q.platform.is.mobile ? 'md' : 'xl'"></q-icon>
                        </div>
                        <div class="col-lg-10 col-xs-grow justify-center">
                          <div class="q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="challengePeriod">
                            on-chain proposal challenge period
                          </div>
                          on-chain proposal challenge period is a time when various, DAO non-related actors can involve in order to determine
                          if proposal should be executed or not.
                          The duration of challenge period is specified in DAO smart contract and is immutable after
                          on-chain proposal creation.<br><br>
                          on-chain proposal smart-contract challengers/supporters can vote with 2 options: voteFor and voteAgainst.
                          <ul>
                            <li>
                              voteAgainst is for rejecting proposal, not agreeing with proposal on-chain assets transfer
                            </li>
                            <li>
                              voteFor is for supporting proposal, agreeing with proposal on-chain assets transfer
                            </li>
                          </ul>
                          Created on-chain proposal has a single voteFor vote - from proposal creator.
                          Everyone can execute any of two challenge/support functions.
                          Executing both voteFor and voteAgainst requires providing a collateral to on-chain proposal smart-contract
                          - the same amount as proposal existing collateral, provided on proposal creation.<br><br>

                          Participants of on-chain proposal challenge involve in process of determining if proposal should
                          be executed or not.
                          The result of on-chain proposal challenge is based on quantity of voteFor and voteAgainst votes.

                          <div class="q-pt-lg q-pb-md text-green text-center" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h5'">
                            on-chain proposal not challenged
                          </div>
                          Unchallenged proposal is the proposal without any voteAgainst submitted during challenge period.
                          Ideally this should be a scenario for every on-chain proposal based on legit, passed off-chain
                          proposal.
                          Unchallenged on-chain proposal is ready to be executed after challenge period ends.
                          Execution of on-chain proposal means transferring DAO assets to the addresses specified in this on-chain proposal.
                          It can be executed by anyone by submitting an on-chain transaction - invoking proposal smart-contract
                          execute function.
                          After execution, on-chain proposal collateral is transferred back to proposal creator, proposal
                          is marked as executed and its lifecycle ends.

                          <div class="q-pt-lg q-pb-md text-red-8 text-center" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h5'">
                            on-chain proposal challenged
                          </div>
                          Challenged proposal is the proposal with at least one voteAgainst submitted during challenge period.<br><br>
                          If there is at least single voteAgainst and only single voteFor (from proposal creator) for proposal
                          during challenge period,
                          the proposal is cancelled and voteAgainst voters receives: his initial collateral + proposal
                          creation collateral (from proposal creator).
                          Initial creation collateral is a reward for voteAgainst voter.<br><br>
                          If there are multiple voteAgainst votes for single voteFor vote (from proposal creator)
                          during challenge period,
                          the proposal is cancelled and creation (initial) collateral is split among voteAgainst voters
                          proportionally to their voteAgainst collateral.
                          voteAgainst voter receives: his initial collateral + proportional part of proposal creation
                          collateral (from proposal creator).
                          Initial creation collateral is a reward for voteAgainst voters.<br><br>

                          Multiple voteAgainst and voteFor votes create a dispute process which is described below.
                        </div>
                      </div>

                      <q-separator color="grey-9" class="q-mt-md q-mb-md"></q-separator>

                      <div class="row items-center ">
                        <div class="col-lg-2 col-xs-grow text-center">
                          <q-icon name="fa-solid fa-5" :size="$q.platform.is.mobile ? 'md' : 'xl'"></q-icon>
                        </div>
                        <div class="col-lg-10 col-xs-grow justify-center">
                          <div class="q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="disputeProcess">
                            Dispute process
                          </div>
                          Proposal dispute process is when there are proposal challengers (voteAgainst) and
                          proposal supporters (voteFor).
                          Initially, when on-chain proposal is created there is only single proposal supporter - proposal creator.
                          However, during challenge period, anyone can become proposal supporter by submitting voteFor
                          transaction. Voting is possible for predefined amount of time (default 3 days).

                          The fundamental mechanics of stateborn DAO on-chain proposals is that its execution depends on
                          majority of supporter votes (voteFor).
                          More voteFor than voteAgainst means proposal passes and can be executed after challenge period ends.
                          More voteAgainst than voteFor means proposal is rejected and will not be possible to be executed after
                          challenge period ends.<br><br>


                          <div class="row items-center q-pt-md">
                            <div class="col-lg-2 col-xs-grow text-center" v-if="$q.platform.is.mobile">
                              <q-img src="/incentive3.png" style="width: 80px"/>
                            </div>
                            <div class="col-lg-10 col-xs-grow justify-center">
                              Voting in stateborn DAOs proposals has <span class="text-green text-bold">economic incentive</span> -
                              when proposal ends, its collateral becomes a reward for part of the voters.
                              More voteFor votes will result in voteAgainst voters collateral to be distributed to voteFor voters.
                              More or equal voteAgainst votes (to voteFor) will result in voteFor collateral being distributed to voteAgainst voters.
                              Voting on proposal is available for everyone using blockchain, the only requirement is providing a collateral.
                            </div>
                            <div class="col-2 text-center" v-if="!$q.platform.is.mobile">
                              <q-img src="/incentive3.png" style="width: 80px"/>
                            </div>
                          </div>

                          <br><br>

                          Correct and secure operation of stateborn DAOs is based on passing only valid (legit) proposals.
                          Ideally every on-chain proposal should be based on legit, passed off-chain proposal.
                          However technically since everyone can create on-chain proposals and vote on on-onchain proposals,
                          there are various operational risks related to voters motivations, interests and goals.
                        </div>
                      </div>

                      <div class="q-pa-lg">
                        <div class="text-h1 text-center q-pt-lg">Challenges</div>
                        <div class="text-overline text-center q-pb-md text-sub" >related to dispute process</div>
                      </div>

                      The non-permissioned nature of stateborn DAOs and the fact that anyone can create on-chain proposals
                      and vote on them, creates various risks and challenges. on-chain proposal decision making process
                      can be based on various motivations, interests and goals of voters.

                      <div class="row items-center q-pt-lg">
                        <div class="col-lg-2 col-xs-grow text-center">
                          <q-img src="/balance2.png" style="height: 60px; width:60px"></q-img>
                        </div>
                        <div class="col-lg-10 col-xs-grow justify-center q-pt-md">
                          <div class="q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="howToAsses">
                            How to assess validity of proposal?
                          </div>
                          "Valid" proposal should be defined as proposal which received majority of votes of DAO member
                          voters.
                          Stateborn proposals voting is off-chain. on-chain proposal is only transfer of DAO assets to
                          addresses specified in off-chain proposal data.
                          <a href="https://stateborn.org" target="_blank">stateborn.org</a> is a platform which allows to create off-chain proposals and vote on them.
                          Proposal document including proposal overview and on-chain assets transfer description is
                          cryptographically secure, immutable and stored in IPFS - open, distributed data storage.
                          off-chain votes are client signed, immutable and also stored in IPFS.
                          When off-chain proposal voting is ended, "proposal report" which includes all the proposal votes
                          is generated and saved to IPFS. <br><br>

                          on-chain proposal contains the IPFS hash of off-chain "proposal report" which contains
                          all the votes data and IPFS hash of off-chain proposal document (description).
                          Validity of proposal should be assessed based on these artefacts generated by off-chain voting, which
                          are proposal document and proposal report (including votes).
                          Data included in "proposal report" should be enough to obtain/calculate proposal voting result. The data format
                          allows to parse it automatically.
                          To summary, since off-chain voting reflects DAO community will,
                          on-chain proposal vote decision making should be based on off-chain proposal result artefacts.
                        </div>
                      </div>
                      <q-separator color="grey-9" class="q-mt-md q-mb-md"></q-separator>

                      <div class="row items-center">
                        <div class="col-lg-2 col-xs-grow text-center">
                          <q-img src="/valid2.png" style="height: 60px; width:60px"></q-img>
                        </div>
                        <div class="col-lg-10 col-xs-grow justify-center">
                          <div class="q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="howToAssure">
                            How to technically assure only valid on-chain proposals pass?
                          </div>
                          Stateborn on-chain DAO treasury proposals are not built to technically solve that problem.
                          In other words, it is not currently solved on smart-contracts level in the way stateborn
                          protocol operates.
                          on-chain only DAOs could offer solution for that problem but in Stateborn off-chain + on-chain model,
                          off-chain governance separates votes from on-chain DAO treasury.<br><br>

                          off-chain voting in stateborn gives DAO community to utilize no-cost voting. Collateral based
                          on-chain mechanics create economic incentive for different group of actors to participate in proposal lifecycle for
                          personal interest - which is potential profit.
                          This is well known blockchain pattern where exist correctness checking mechanisms like Oracles,
                          Slashers or Watchtowers.
                          Stateborn allows to participate in on-chain "validation" to everyone, not only to selected group
                          of validators.
                          The only requirement for choosing a side in dispute is providing collateral.<br><br>

                          Stateborn on-chain DAO treasury management depends on proposal voters who can vote on proposal
                          based on their own interest, not necessarily based on proposal validity.
                          There are however rationale and mechanisms in stateborn protocol for voters to motivate them
                          voting only for valid proposals.
                        </div>
                      </div>
                      <q-separator color="grey-9" class="q-mt-md q-mb-md"></q-separator>
                      <div class="row items-center ">
                        <div class="col-lg-2 col-xs-grow text-center">
                          <q-img src="/motivate2.png" style="height: 60px; width:60px"></q-img>
                        </div>
                        <div class="col-lg-10 col-xs-grow justify-center">
                          <div class="q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="howToMotivate">
                            How to motivate on-chain voters to vote on valid proposals?
                          </div>
                          on-chain voters can or not have an interest in on-chain proposals voting. <br><br>
                          Voting on invalid (not legit) proposal which doesn't reflect the DAO
                          community will - most likely will result the end of such DAO, due to
                          loss of trust and possibly DAO treasury funds. Anyone having interest in DAOs success should not vote on
                          invalid proposals. <br><br>
                          Invalid proposal which was successfully executed on-chain will also result in Stateborn DAOs
                          ecosystem loss of trust - that's why motivation
                          of everyone being part of Stateborn ecosystem, including on-chain voters should be to vote only
                          on valid proposals. <br><br>

                          Nevertheless, rationale, game theory based interest of on-chain voters can also be to vote on
                          proposals accordingly to potential profit.
                          There are some scenarios where voters having only-profit strategy can act differently.<br><br>
                        </div>
                      </div>

                      <div class="q-pa-lg">
                        <div class="text-h1 text-center q-pt-lg">Scenarios</div>
                        <div class="text-overline text-center q-pb-md text-sub" >Interest driven voters actions</div>
                      </div>

                      on-chain DAO proposals voting is available to various actors having various motivations. on-chain proposal
                      mechanics may influence voters decisions. Below we describe some scenarios of various, possible
                      on-chain voters actions who are motivated with their own interest.

                      <div class="row items-center q-pt-lg">
                        <div class="col-lg-2 col-xs-grow text-center">
                          <q-img src="/cancel.png" style="height: 60px; width:60px"></q-img>
                        </div>
                        <div class="col-lg-10 col-xs-grow justify-center">
                          <div class="q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="singleVoteCancels">
                            #1 (popular): single vote wants to cancel proposal
                          </div>
                          There is 1000 DAI transfer proposal from DAO treasury to some address. The proposal is legit and based on off-chain voting.
                          There are no voteAgainst votes and single voteFor - from proposal creator.
                          In such case voteFor has no point, since there is no economic incentive to do so.
                          There is however motivation to voteAgainst vote - single vote against is enough for proposal
                          to not pass. voteAgainst voter, after proposal ends, will get 1 ETH as reward.
                          Such proposal is cancelled. <br>
                          voteAgainst voter may be motivated to get collateral reward (challenging proposal),
                          however takes a risk to loose own collateral if proposal will pass (more supporters engage).
                        </div>
                      </div>
                      <q-separator color="grey-9" class="q-mt-md q-mb-md"></q-separator>

                      <div class="row items-center">
                        <div class="col-lg-2 col-xs-grow text-center">
                          <q-img src="/imbalance.png" style="height: 60px; width:60px"></q-img>
                        </div>
                        <div class="col-lg-10 col-xs-grow justify-center">
                          <div class="q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="disproportional">
                            #2: disproportional majority of votes on contrary side
                          </div>
                          There is 100 000 DAI transfer proposal from DAO treasury to some address. The proposal is legit and based on off-chain voting.
                          There are 2 forVotes (2 ETH collateral) and 100 againstVotes (100 ETH collateral).
                          This can be a scenario where proposal is legit, but there is a group of voters who wants to
                          sabotage DAO.
                          In such disproportional scenario, profit searching voter will probably not vote according to
                          proposal validity.
                          He will not care if it's legit or not, but will vote against proposal, because it's not likely
                          to pass and there is potential reward to be taken.
                          If he votes for, and proposal ends with more for votes - he will get 1/101 of 2 ETH as reward.
                          Such proposal is canceled.
                        </div>
                      </div>
                      <q-separator color="grey-9" class="q-mt-md q-mb-md"></q-separator>

                      <div class="row items-center">
                        <div class="col-lg-2 col-xs-grow text-center">
                          <q-img src="/balance.png" style="height: 60px; width:60px"></q-img>
                        </div>
                        <div class="col-lg-10 col-xs-grow justify-center">
                          <div class="q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="equalNumber">
                            #3: equal number of votes on both sides
                          </div>
                          There is 1 000 000 DAI transfer proposal from DAO treasury to some address. The proposal is legit and based on off-chain voting.
                          There are 100 votes against (100 ETH collateral) and 100 for votes (100 ETH collateral).
                          Rational voter should vote for, because there is no economic interest to vote against.
                          Theoretically he could vote against, because based on current votes, it so so likely that
                          proposal will pass as that it will not.
                          However other factors can be taken into account, like DAO community will, potential loss of
                          trust if valid proposal will not pass, etc.
                          If he votes for, after proposal ends, he will get 1/101 of 100 ETH as reward.
                          Proposal is passed.
                        </div>
                      </div>
                      <q-separator color="grey-9" class="q-mt-md q-mb-md"></q-separator>

                      <div class="row items-center ">
                        <div class="col-lg-2 col-xs-grow text-center">
                          <q-img src="/thief.png" style="height: 60px; width:60px"></q-img>
                        </div>
                        <div class="col-lg-10 col-xs-grow justify-center">
                          <div class="text-red-8 q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="theft">
                            #4: theft attempt (not legit proposal)
                          </div>
                          There is 500 000 DAI transfer proposal from DAO treasury to some address. The proposal is not legit but attempt of DAO theft.
                          There are 100 forVotes (100 ETH collateral) and not yet againstVote votes (on-chain proposal
                          was just submitted).
                          Rational voter at that point has no interest to vote at all, since there are no againstVote
                          votes yet, so no potential reward.
                          When voteAgainst votes start to appear, he can vote against, joining the "legit" side of
                          contrary voters or
                          can vote for, joining scammers side. In such scenario it's hard to really guess how profit
                          searching vote would vote.
                        </div>
                      </div>
                      <br><br>

                      <div class="q-pa-lg">
                        <div class="text-h1 text-center ">Strategies</div>
                        <div class="text-overline text-center q-pb-md text-sub" >to secure on-chain DAO treasury</div>
                      </div>



                      Profit-only interest is a significant risk for stateborn DAOs on-chain treasury. Newly created legit proposals are in
                      risk of single vote against cancellation.
                      DAOs operating big treasury are in risk of on-chain theft proposals. Multiple for and against voters operate a non-obvious
                      result decision making process which can drive away using Stateborn DAO solution.<br><br>
                      Fortunately, there are some strategies to mitigate these risks.

                      <div class="row items-center q-pt-lg">
                        <div class="col-lg-2 col-xs-grow text-center">
                          <q-img src="/aquire.png" style="height: 60px; width:60px"></q-img>
                        </div>
                        <div class="col-lg-10 col-xs-grow justify-center">
                          <div class="q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="acquisition">
                            DAO voting power acquisition
                          </div>
                          The DAO interest is to acquire on-chain voting power in order to vote for proposals accordingly
                          to DAO community will. This means - acquire more "for" votes for legit proposals and more "against"
                          votes for not legit proposals.
                          on-chain proposal voting is trustless so it doesn't mean DAO needs to directly acquire more funds.
                          Collateral as a reward acts a motivation for actions related to DAO voting power acquisition.
                          Through various channels and techniques DAO should acquire voting power to vote on adequate proposal
                          decision.
                          This aspect goes beyond stateborn protocol and is strictly related to DAO community, partnerships,
                          contacts, etc.
                          Nevertheless this is important aspect of stateborn DAOs operation.
                        </div>
                      </div>
                      <q-separator color="grey-9" class="q-mt-md q-mb-md"></q-separator>


                      <div class="row items-center">
                        <div class="col-lg-2 col-xs-grow text-center">
                          <q-img src="/token.png" style="height: 60px; width:60px"></q-img>
                        </div>
                        <div class="col-lg-10 col-xs-grow justify-center">
                          <div class="q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="daoToken">
                            DAO token as collateral
                          </div>
                          on-chain DAO defines the collateral for on-chain proposals. It's a native blockchain cryptocurrency (e.g. 1 ETH)
                          but every proposal by default can also use DAO governance token as collateral.
                          Creating proposal always requires cryptocurrency collateral (e.g. 1 ETH) but voteFor or voteAgainst
                          can be done with token collateral.<br><br>

                          Predefined amount of DAO governance tokens acts as a collateral for proposal.
                          The ratio is defined in DAO smart contract and is immutable after on-chain proposal creation.
                          DAO governance token owners deposit tokens to dedicated on-chain "DAO token pool" which gives them possibility
                          to vote in on-chain proposals.
                          For example on-chain proposal vote would require 1 ETH for vote or owning 100 DAO governance tokens in
                          "DAO token pool".
                          DAO governance tokens as collateral mechanism is very important economical factor for on-chain proposal
                          voting.<br><br>


                          DAO governance token owners act an effective contrary force for malicious voters, who vote against
                          DAO community decisions reflected in off-chain voting.
                          Voting on-chain by DAO community members is not a way stateborn DAOs should normally operate (voting
                          off-chain)
                          but if necessary - is a method to protect DAO treasury from malicious actors.
                          Potential collateral reward for DAO token owner voters is also a motivation for DAO token owners to
                          vote on-chain. <br><br>

                          DAO members voting on-chain show their approbation of proposal decision but also decrease a
                          potential reward for malicious voters. DAO members votes put a DAO governance tokens to "DAO token pool"
                          but these tokens never become a reward for a majority side voters of on-chain proposal.
                          Owners of tokens in "DAO token pool" own them as long as on-chain proposals on which they vote, are ended with
                          a decision these owners voted. If token owner votes voteFor with 100 tokens and on-chain proposal passes - token owner
                          still owns tokens in pool. However if the proposal not passes, token owner loses the tokens in pool and these
                          tokens are transferred to on-chain DAO treasury. <br><br>


                          DAO governance tokens can have a value but are not a reward for on-chain proposals voters.
                          The only reward is a cryptocurrency collateral provided by voters.
                          The more DAO governance based votes for on-chain proposal side, the less economically rational is to vote on contrary decision.
                          Opposite voters risk to be in lost voting side when DAO on-chain token voters group is big enough to obtain more votes than opposite voters.
                          Additionally token votes don't increase potential collateral reward.
                          It is not rational for cryptocurrency collateral voters to vote against token voters but also for malicious token voters,
                          which will loose their tokens if they vote on lost side - their tokens will be transferred to DAO on-chain treasury.
                          <br><br>

                          It is possible for malicious DAO token owners to compete in on-chain proposal voting with honest token votes,
                          however such scenario could be minimized with healthy distribution of DAO governance tokens and lack of
                          centralization (big token holders). Transferring DAO governance tokens back to DAO from
                          lost on-chain proposal side voters (like malicious voters) is a self regulation and DAO saboteurs
                          elimination mechanism. <br><br>

                          Since malicious actors such as scammers, hackers, DAO saboteurs not own DAO governance tokens,
                          they have to vote using only "cryptocurrency" collateral (like ETH).
                        </div>
                      </div>

                      <div class="q-pa-lg">
                        <div class="q-pt-md q-pb-xs text-center" :class="$q.platform.is.mobile ? 'text-h5' : 'text-h1'" id="summary">Summary</div>
                        <div class="text-overline text-center q-pb-md text-sub" >Why stateborn DAO?</div>
                      </div>

                      Stateborn protocol can be an effective solution for truly decentralized autonomous organizations.
                      We believe that stateborn proposes unique DAO solution utilizing technologies and concepts widely
                      researched and adopted on the market. <br><br>

                      off-chain voting is no-cost governance method which can attract communities to participate in
                      DAO governance process.
                      on-chain DAO treasury is a decentralized, non-permissioned solution to maintain DAO assets utilizing
                      blockchain technology solutions and concepts.

                      off-chain proposal is not technically related with on-chain DAO treasury and its management however
                      it's a tool which allows to measure/obtain DAO community will/actions and reflect it on-chain.

                      Game theory, economic incentive driven design of on-chain DAO treasury assets transfers proposals engages various independent actors.
                      Cryptocurrency reward incentives actors to engage in on-chain proposal voting.
                      DAO governance token voting possibility is an autonomy maintaining method -
                      effectively decreases the engagement of malicious actors voting against DAO community will.
                    </div>
                  </div>
                  <div class="row justify-center q-pt-lg">
                    <div class="col-auto">
                      <q-btn  round flat @click="goToGithub()">
                        <q-avatar size="25px" class="bg-grey-5">
                          <img src="/brands/icons8-github-50.png">
                        </q-avatar>
                      </q-btn>
                      <q-btn  round flat @click="goToTwitter()" >
                        <q-avatar size="25px" class="bg-grey-5">
                          <img src="/brands/icons8-twitter-50.png">
                        </q-avatar>
                      </q-btn>
                    </div>
                  </div>
                  <div class="text-center text-subtitle2 q-pb-lg">© 2023 stateborn.org</div>
                  <!--              <div class="row" style="padding-top:200px">-->
                  <!--                <div class="col-12">-->
                  <!--                  <div class=" text-bold text-center q-pb-md"-->
                  <!--                       :class="$q.platform.is.mobile ? 'text-h2' : 'text-h1'"></div>-->
                  <!--                  Decentralized Autonomous Organizations are exciting concept of communities govern by a protocol,-->
                  <!--                  mostly utilizing blockchain and related technologies.-->

                  <!--                  Unfortunately DAOs are hard.<br>-->
                  <!--                  <b>on-chain (blockchain) only</b> based governance is expensive due to costs of utilizing-->
                  <!--                  blockchain.<br>-->
                  <!--                  <b>off-chain</b> governance has "no cost", because votes are not saved directly in blockchain but-->
                  <!--                  it's only about proposals and voting.-->
                  <!--                  Any form of DAO blockchain treasury (wallet) is mostly managed by some closed, limited, group of-->
                  <!--                  people (founders).-->
                  <!--                  You could argue how decentralized it is and how autonomous it is.<br><br>-->

                  <!--                  Stateborn DAO is focusing on building truly autonomous organizations. Stateborn is hybrid: on-chain-->
                  <!--                  + off-chain.<br>-->
                  <!--                  It is zero cost, cryptography secured, third party trust minimum off-chain voting system.-->
                  <!--                  Communities can create proposals and vote on them,-->
                  <!--                  having effective, transparent governance process.<br>-->
                  <!--                  Stateborn is also non-permissioned on-chain DAO treasury controlled by off-chain voting. It is a-->
                  <!--                  treasury managed by the community with no owners.<br><br>-->

                  <!--                  We believe Stateborn proposes unique DAO solution utilizing technologies and concepts widely adopted-->
                  <!--                  on the market.-->
                  <!--                </div>-->
                  <!--              </div>-->
                </div>
              </div>
            </div>
          </q-scroll-area>
        </div>
      </div>

      <!--      <div class="row justify-center text-white" style="background: rgb(0, 0, 0, 0.85) !important;">-->
      <!--        <div class="col-lg-6 col-xs-grow">-->
      <!--          <div class="row q-pt-lg">-->
      <!--            <div class="col-12">-->
      <!--              <div class="text-h1 text-bold text-center q-pb-md" :class="$q.platform.is.mobile ? 'text-h2' : 'text-h1'">Is Stateborn really needed?</div>-->
      <!--              We believe that yes. It's because it offers no-cost off-chain voting but is also non-permissioned on-chain DAO (treasury)-->
      <!--              controlled by off-chain voting. Why does it have to be hybrid off-chain + on-chain?<br>-->

      <!--              <div class="q-pt-md q-pb-xs" :class="$q.platform.is.mobile ? 'text-h5' : 'text-h2'">Blockchain only DAOs problem</div>-->


      <!--              First let's make an overview of on-chain (blockchain based) only DAOs.<br><br>-->

      <!--              As said before, on-chain DAOs are expensive to use, what makes them not suitable for most use-cases. Every action-->
      <!--              on on-chain DAO, like creating a proposal and voting requires a transaction to be sent to blockchain.-->
      <!--              This transaction has a cost and it's paid in blockchain native token (ETH, MATIC, ARB etc.). The cost of this transaction-->
      <!--              is taken by user - the DAO member. This is a demotivating factor for users to participate in the DAO governance process.-->
      <!--              It effectively eliminates the engagement of community in DAO governance what at the end makes the DAO useless.<br><br>-->

      <!--              On-chain DAOs are have operational challenges as well. Counting votes is not trivial. It is hard to count votes in a way that-->
      <!--              is not possible to manipulate. Imagine someone who owns 1000 DAO tokens, makes a vote on DAO proposal, and then sends these tokens to a friend,-->
      <!--              which makes a voting again. It's not obvious how to to handle such scenarios correct. <br>-->

      <!--              It can be argued that L2 solutions like Optimism or Arbitrum can solve the problem of high transaction costs. However, due to nature-->
      <!--              of blockchain, cost is inseparably related to blockchain, this is why we believe it's not an argument. Strong community-->
      <!--              engagement can be built on free interactions and this can be achieved without usage of blockchain.<br>-->


      <!--              <div class="q-pt-md q-pb-xs" :class="$q.platform.is.mobile ? 'text-h5' : 'text-h2'">Off-chain only?</div>-->
      <!--              Off-chain governance is widely adopted (Snapshot). It's free, easy to use, fast, secure and transparent.-->
      <!--              It has inherent censorship risk, however it's possible to minimize it with the right technics.<br>-->

      <!--              However DAOs-->
      <!--            </div>-->
      <!--          </div>-->

      <!--        </div>-->
      <!--      </div>-->


    </QPage>
  </div>

</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { sleep } from 'src/api/services/sleep-service';
import { goToGithub, goToTwitter } from 'src/api/services/utils-service';
import { getElementOffset } from 'src/api/services/ui-utils';
import { useQuasar } from 'quasar';


const scrollAreaRef = ref(null);
const position = ref(300);

const scrollToElement = (el: any) => {
  const ele = document.getElementById(el);
  // @ts-ignore
  const offset = ele.offsetTop - ele.scrollHeight + 58;
  // @ts-ignore
  scrollAreaRef.value.setScrollPosition('vertical', offset, 500);
  position.value = Math.floor(Math.random() * 1001) * 20;
};
const $q = useQuasar();

const barStyle = ref({
  borderRadius: '0px',
  backgroundColor: '#5B5B5B',
  width: $q.platform.is.mobile ? '2px': '5px',
  opacity: 0.2
});

const thumbStyle = ref({
  borderRadius: '0px',
  backgroundColor: '#5B5B5B',
  width: $q.platform.is.mobile ? '2px': '5px',
  opacity: 0.75
});

const height = window.innerHeight - 75;
const scrollHeight = ref(height);

const items = ref(<any[]>[]);
const setItems = () => {
  items.value = [
    {
      label: 'Contents',
      scrollTo: '',
      icon: '',
      img: '',
      isLabelOnly: true,
      separatorAfter: false,
      active: true,
      topOffset: 0,
    },
    {
      scrollTo: 'statebornProtocol',
      label: 'Stateborn protocol in 60 seconds',
      icon: '',
      img: '',
      isLabelOnly: false,
      separatorAfter: true,
      active: true,
      topOffset: getElementOffset('statebornProtocol'),
    },
    {
      scrollTo: 'mechanics',
      label: 'Mechanics of stateborn protocol',
      icon: '',
      img: '',
      isLabelOnly: false,
      separatorAfter: false,
      active: false,
      topOffset: getElementOffset('mechanics'),
    },
    {
      scrollTo: '',
      label: 'DAO lifecycle',
      icon: '',
      img: '',
      isLabelOnly: true,
      separatorAfter: false,
      active: false,
      topOffset: 0,
    },
    {
      scrollTo: 'creation',
      label: 'off-chain + on-chain DAO creation',
      icon: 'fa-solid fa-1',
      img: '',
      isLabelOnly: false,
      separatorAfter: false,
      active: false,
      topOffset: getElementOffset('creation'),
    },
    {
      scrollTo: 'proposalCreation',
      label: 'off-chain DAO proposal creation',
      icon: 'fa-solid fa-2',
      img: '',
      isLabelOnly: false,
      separatorAfter: false,
      active: false,
      topOffset: getElementOffset('proposalCreation'),
    },
    {
      scrollTo: 'onchainProposalCreation',
      label: 'on-chain DAO proposal creation',
      icon: 'fa-solid fa-3',
      img: '',
      isLabelOnly: false,
      separatorAfter: false,
      active: false,
      topOffset: getElementOffset('onchainProposalCreation'),
    },
    {
      scrollTo: 'challengePeriod',
      label: 'on-chain proposal challenge period',
      icon: 'fa-solid fa-4',
      img: '',
      isLabelOnly: false,
      separatorAfter: false,
      active: false,
      topOffset: getElementOffset('challengePeriod'),
    },
    {
      scrollTo: 'disputeProcess',
      label: 'Dispute process',
      icon: 'fa-solid fa-5',
      img: '',
      isLabelOnly: false,
      separatorAfter: false,
      active: false,
      topOffset: getElementOffset('disputeProcess'),
    },
    {
      scrollTo: '',
      label: 'Challenges',
      icon: '',
      img: '',
      isLabelOnly: true,
      separatorAfter: true,
      active: false,
      topOffset: 0,
    },
    {
      scrollTo: 'howToAsses',
      label: 'How to assess validity of proposal?',
      icon: '',
      img: '/balance2.png',
      isLabelOnly: false,
      separatorAfter: false,
      active: false,
      topOffset: getElementOffset('howToAsses'),
    },
    {
      scrollTo: 'howToAssure',
      label: 'How to technically assure only valid proposals pass?',
      icon: '',
      img: '/valid2.png',
      isLabelOnly: false,
      separatorAfter: false,
      active: false,
      topOffset: getElementOffset('howToAssure'),
    },
    {
      scrollTo: 'howToMotivate',
      label: 'How to motivate on-chain voters to vote on valid proposals?',
      icon: '',
      img: '/motivate2.png',
      isLabelOnly: false,
      separatorAfter: true,
      active: false,
      topOffset: getElementOffset('howToMotivate'),
    },
    {
      scrollTo: '',
      label: 'Scenarios',
      icon: '',
      img: '',
      isLabelOnly: true,
      separatorAfter: false,
      active: false,
      topOffset: 0,
    },
    {
      scrollTo: 'singleVoteCancels',
      label: 'Single vote wants to cancel proposal',
      icon: '',
      img: '/cancel.png',
      isLabelOnly: false,
      separatorAfter: false,
      active: false,
      topOffset: getElementOffset('singleVoteCancels'),
    },
    {
      scrollTo: 'disproportional',
      label: 'disproportional majority of votes on contrary side',
      icon: '',
      img: '/imbalance.png',
      isLabelOnly: false,
      separatorAfter: false,
      active: false,
      topOffset: getElementOffset('disproportional'),
    },
    {
      scrollTo: 'equalNumber',
      label: 'equal number of votes on both sides',
      icon: '',
      img: '/balance.png',
      isLabelOnly: false,
      separatorAfter: false,
      active: false,
      topOffset: getElementOffset('equalNumber'),
    },
    {
      scrollTo: 'theft',
      label: 'theft attempt (not legit proposal)',
      icon: '',
      img: '/thief.png',
      isLabelOnly: false,
      separatorAfter: true,
      active: false,
      topOffset: getElementOffset('theft'),
    },
    {
      scrollTo: '',
      label: 'Strategies',
      icon: '',
      img: '',
      isLabelOnly: true,
      separatorAfter: false,
      active: false,
      topOffset: 0,
    },
    {
      scrollTo: 'acquisition',
      label: 'DAO voting power acquisition',
      icon: '',
      img: '/aquire.png',
      isLabelOnly: false,
      separatorAfter: false,
      active: false,
      topOffset: getElementOffset('acquisition'),
    },
    {
      scrollTo: 'daoToken',
      label: 'DAO token as collateral',
      icon: '',
      img: '/token.png',
      isLabelOnly: false,
      separatorAfter: true,
      active: false,
      topOffset: getElementOffset('daoToken'),
    },
    {
      scrollTo: 'summary',
      label: 'Summary - why stateborn DAO?',
      icon: '',
      img: '',
      isLabelOnly: false,
      separatorAfter: true,
      active: false,
      topOffset: getElementOffset('summary'),
    }
  ];
};
setItems();
onMounted(async () => {
  await sleep(200);
  setItems();
});


const onScroll = (val: any) => {
  if (scrollAreaRef.value.getScrollPercentage().top === 1) {
    for (let i = 0 ; i < items.value.length; i++) {
      items.value[i].active = false;
    }
    items.value[items.value.length - 1].active = true;
  } else {
    const verticalPosition: number = val.verticalPosition;
    let index = 0;
    for (let i = 0; i < items.value.length; i++) {
      const item = items.value[i];
      if (item.topOffset !== 0) {
        if (item.topOffset <= verticalPosition) {
          index = i;
        } else {
          break;
        }
      }
    }
    for (let i = 0; i < items.value.length; i++) {
      items.value[i].active = i === index;
    }
    console.log('vertical position', verticalPosition);
  }
}

const resizeListener = () => {
  scrollHeight.value = window.innerHeight - 75;
}

window.addEventListener('resize', resizeListener, true);

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeListener, true)
});
</script>
