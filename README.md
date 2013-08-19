# What Are They Running

Unsure who to vote for at the 2013 Australian federal election?

Does one party favour open-source more than the other?

Using data from [OpenAustralia.org][] each member of the House of Represenatives
with a personal website is checked. A `HEAD` request is issued to their website and
the corresponding HTTP headers are used to determine their operating system, Web server,
and Application server.

[OpenAustralia.org]: http://www.openaustralia.org/

## Usage

To collect data for each member if the House of Represenativies run the following
command:

    git clone https://github.com/srbartlett/whataretheyrunning.git
    cd whataretheyrunning
    gem install nokogiri thor
    ./bin/whataretheyrunning ask_for_head

This outputs a json file that can be used for analysis.

An example web page that uses javascript to visualise the results can be
found in a branch called [gh-pages][]

[gh-pages]: https://github.com/srbartlett/whataretheyrunning/tree/gh-pages

## Hosting

Github Pages is used to host the [web page][]

[web page]: http://srbartlett.github.io/whataretheyrunning

#### Feedback welcome!

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


