import React from 'react'
import { SelectInput, TextInput } from 'bloom-forms'

import Accordion from 'presentation/layout/accordion'

const ExampleAccordion = () => {
  // isValid can be a computed value that gives the header an is-valid class
  const selectOptions = [
    { label: 'Muffins', value: 'muffins' },
    { label: 'Cookies', value: 'cookies' },
    { label: 'Cakes', value: 'birthday cakes' }
  ]
  const sections = [
    {
      header: 'Section 1',
      contents: <div>I am section 1's contents</div>,
      isValid: true
    },
    {
      header: 'Section 2',
      contents: (
        <div>
          I am section 2's contents. Howl on top of tall thing purrr purr little
          cat, little cat purr purr so warm up laptop with butt lick butt fart
          rainbows until owner yells pee in litter box hiss at cats or have a
          lot of grump in yourself because you can't forget to be grumpy and not
          be like king grumpy cat, but freak human out make funny noise mow mow
          mow mow mow mow success now attack human pet right here, no not there,
          here, no fool, right here that other cat smells funny you should
          really give me all the treats because i smell the best and omg you
          finally got the right spot and i love you right now so sit by the
          fire. Claw drapes slap kitten brother with paw. Stare at the wall,
          play with food and get confused by dust hunt by meowing loudly at 5am
          next to human slave food dispenser. Kitty scratches couch bad kitty
          mark territory human give me attention meow and milk the cow, but jump
          five feet high and sideways when a shadow moves but that box? i can
          fit in that box. Purr attack dog, run away and pretend to be victim
          climb leg.
        </div>
      ),
      isValid: true
    },
    {
      header: 'Section 3',
      contents: (
        <div>
          Section 3 contents
          <TextInput
            id='textinput'
            name='textinput'
            label='Text Input'
            showLabel
            value={''}
            onChange={() => {
              return
            }}
            placeholder='Nonfunctional Text Input'
          />
          <SelectInput
            options={selectOptions}
            name='select'
            formId='example-form'
            typeAhead={false}
            value=''
            showLabel
            label='Select Input -- No TypeAhead'
            onChange={() => {
              return
            }}
            error={'Oh sad this isn\'t hooked up'}
          />
        </div>
      ),
      isValid: true
    }
  ]

  return <Accordion sections={sections} />
}

export default ExampleAccordion
