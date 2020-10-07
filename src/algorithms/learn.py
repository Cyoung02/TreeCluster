#!/usr/bin/env python3
from queue import PriorityQueue
from math import log

# merge multiple sorted lists into a sorted list
def merge_multi_sorted_lists(lists):
    pq = PriorityQueue()
    for l in range(len(lists)):
        if len(lists[l]) != 0:
            pq.put((lists[l][0],l))
    #inds tracks how many elements have been inserted from each list
    inds = [1 for _ in range(len(lists))]
    out = list()
    while not pq.empty():
        #d is priority(value), l is index
        d,l = pq.get(); out.append(d)
        if inds[l] < len(lists[l]):
            pq.put((lists[l][inds[l]],l))
        inds[l] += 1
    return out

BRACKET = {
    '[': ']', # square bracket
    '{': '}', # curly bracket
    "'": "'", # single-quote
    '"': '"', # double-quote
}

print(']' in BRACKET)
