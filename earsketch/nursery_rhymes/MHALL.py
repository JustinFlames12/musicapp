# description: Plays Mary Had A Little Lamb
from earsketch import *

import random
import math

# Make variable for song name
song_name = 'Mary Had A Little Lamb'

# Set up tempo (between 80 and 150 inclusively)
tempo = 150
setTempo(tempo)

# Establish Parameters for rythym notes
quarter_note = 0.25
half_note = 0.5
eighth_note = 0.125
sixteenth_note = 0.0625
whole_note = 1.0
dotted_quarter_note = 0.375
dotted_eighth_note = 0.1875
dotted_half_note = 0.75

# Set up measure and beat counter variable
current_place = 1

# Set up instrument names
melody_instrument = JUSTINSAHEFIL1092_SYNTH_ORGAN_F
clap_instrument = JUSTINSAHEFIL1092_CLAP_AT_TWO_CHURCH_1_WAV

# Set up key signature (0 is key of F, 2 is key of G, etc.)
# Note: the last parameter for the setEffect used below must
# stay between -12 and 12.
# So: this means the key variable must stay between -12 and 3
key = 0

# Set up level of difficulty (between 0 and 12 inclusively)
lod = 6

# Set up other notes used in song
setEffect(1, PITCHSHIFT, PITCHSHIFT_SHIFT, 4 + key) #A
setEffect(2, PITCHSHIFT, PITCHSHIFT_SHIFT, 2 + key) #G
setEffect(3, PITCHSHIFT, PITCHSHIFT_SHIFT, 0 + key) #F
setEffect(4, PITCHSHIFT, PITCHSHIFT_SHIFT, 7 + key) #C

# Set up number of notes used in song
num_notes = 4

# Set up number of notes to keep based on level of difficulty
if lod != 0:
    num_notes_to_take = math.floor((lod * num_notes) / 12)
    track_numbers = [number for number in range(1, num_notes + 1)]
    random_track_numbers = random.sample(track_numbers, num_notes_to_take)
else:
    num_notes_to_take = 0
    random_track_numbers = []

# Set up music configuration dictionary
music_configuration = {
    'song_name': song_name,
    'tempo': tempo,
    'key': key,
    'level_of_difficulty': lod,
    'random_track_numbers_taken_out': random_track_numbers
}
print('Music Configuration Info seen below:')
print(music_configuration)

# Define the function for playing notes
def play_note(track: int, beat: float):
    global current_place
    global random_track_numbers
    global melody_instrument
    global clap_instrument
    if track in random_track_numbers:
        if beat >= 1.0: # If beat is greater than or equal to a whole note
            # Play clap for half note and add in half rest
            fitMedia(clap_instrument, track, current_place, current_place + 0.5)
            current_place = current_place + beat
        else:
            fitMedia(clap_instrument, track, current_place, current_place + beat)
            current_place = current_place + beat
    else:
        fitMedia(melody_instrument, track, current_place, current_place + beat)
        current_place = current_place + beat

# Play the song
play_note(1, quarter_note)
play_note(2, quarter_note)
play_note(3, quarter_note)
play_note(2, quarter_note)
play_note(1, quarter_note)
play_note(1, quarter_note)
play_note(1, half_note)
play_note(2, quarter_note)
play_note(2, quarter_note)
play_note(2, half_note)
play_note(1, quarter_note)
play_note(4, quarter_note)
play_note(4, half_note)
play_note(1, quarter_note)
play_note(2, quarter_note)
play_note(3, quarter_note)
play_note(2, quarter_note)
play_note(1, quarter_note)
play_note(1, quarter_note)
play_note(1, quarter_note)
play_note(1, quarter_note)
play_note(2, quarter_note)
play_note(2, quarter_note)
play_note(1, quarter_note)
play_note(2, quarter_note)
play_note(3, half_note)